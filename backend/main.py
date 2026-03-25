from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import easyocr
import cv2
from cv2 import dnn_superres
from PIL import Image
import shutil
import psycopg2
import numpy as np
import os
from datetime import datetime
import re
import fitz  
from transformers import LightOnOcrForConditionalGeneration, LightOnOcrProcessor
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD MODELS
model_name = "lightonai/LightOnOCR-2-1B"

# LOAD MODELS
reader = easyocr.Reader(['en'])

processor = LightOnOcrProcessor.from_pretrained(model_name)
model = LightOnOcrForConditionalGeneration.from_pretrained(model_name)
device = torch.device("cpu")
model.to(device)
dtype = torch.float32 if device.type == "cpu" else torch.bfloat16
sr = dnn_superres.DnnSuperResImpl_create()

sr.readModel("model/ESPCN_x4.pb")
sr.setModel("espcn", 4)


# DATABASE CONNECTION
def get_connection():
    try:
        return psycopg2.connect(
            database="image_data",
            user="postgres",
            password="iamm@Gma422",
            host="127.0.0.1",
            port=5432
        )
    except Exception as e:
        print("Database Error:", e)
        return None


# SAVE IMAGE LOCALLY
def save_image_local(image_path):

    base_folder = "OCR_App_Images"

  
    os.makedirs(base_folder, exist_ok=True)
    date_folder = datetime.now().strftime("%Y-%m-%d")
    save_path = os.path.join(base_folder, date_folder)

    os.makedirs(save_path, exist_ok=True)

    filename = datetime.now().strftime("%H%M%S_") + os.path.basename(image_path)

    new_path = os.path.join(save_path, filename)

    shutil.copy(image_path, new_path)

    return new_path

def preprocess_image(image_path):

    image = cv2.imread(image_path)
    
    image = sr.upsample(image)
    
    return image



def convert_pdf_to_images(pdf_path, dpi=300):
    images = []
    
    doc = fitz.open(pdf_path)
    
    for page in doc:
        pix = page.get_pixmap(dpi=dpi)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        images.append(img)
    
    doc.close()
    return images

# OCR FUNCTION
def extract_text_from_image(image):

    import numpy as np

    # ---- Safe image handling ----
    if isinstance(image, str):
        image = Image.open(image).convert("RGB")

    elif isinstance(image, np.ndarray):
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(image)

    elif isinstance(image, Image.Image):
        image = image.convert("RGB")

    else:
        raise ValueError("Unsupported image type")

    # ---- Conversation ----
    conversation = [
        {
            "role": "user",
            "content": [
                {"type": "image", "image": image},
                {"type": "text", "text": "Extract all readable text clearly."}
            ]
        }
    ]

    # ---- Processor ----
    inputs = processor.apply_chat_template(
        conversation,
        add_generation_prompt=True,
        tokenize=True,
        return_dict=True,
        return_tensors="pt",
    )

    inputs = {
        k: v.to(device=device, dtype=dtype) if v.is_floating_point()
        else v.to(device)
        for k, v in inputs.items()
    }

    # ---- Generate ----
    output_ids = model.generate(
        **inputs,
        max_new_tokens=1024
    )

    generated_ids = output_ids[0, inputs["input_ids"].shape[1]:]

    text = processor.decode(generated_ids, skip_special_tokens=True)

    return text

# SAVE TO DATABASE
def save_to_database(image_path, description, cleaned_description):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO Image (Image_Link) VALUES (%s) RETURNING Image_Id;",
        (image_path,)
    )

    image_id = cursor.fetchone()[0]

    cursor.execute(
        "INSERT INTO Image_details (Image_Id, Description, Cleaned_Description) VALUES (%s,%s,%s);",
        (image_id, description, cleaned_description)
    )

    conn.commit()
    cursor.close()
    conn.close()


@app.post("/extract-text")
async def extract_text(files: list[UploadFile] = File(...)):
    os.makedirs("uploads", exist_ok=True)

    all_cleaned_text = []

    for file in files:
        file_path = os.path.join("uploads", file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        ext = os.path.splitext(file.filename)[1].lower()

        if ext == ".pdf":
            pdf_images = convert_pdf_to_images(file_path)

            for img in pdf_images:
                text = extract_text_from_image(img)
                all_cleaned_text.append(text)

        else:
            text = extract_text_from_image(file_path)
            all_cleaned_text.append(text)

    combined_text = "\n\n".join(all_cleaned_text)

    return {
        "extracted_text": combined_text
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)