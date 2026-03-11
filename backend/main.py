import easyocr
import cv2
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import psycopg2
import numpy as np
import os
from datetime import datetime
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change to React URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD MODELS (only once at startup)
reader = easyocr.Reader(['en'])
processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")


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


# SAVE IMAGE
def save_image(uploaded_file: UploadFile):

    BASE_FOLDER = "OCR_App_Images"

    date_folder = datetime.now().strftime("%Y-%m-%d")
    save_path = os.path.join(BASE_FOLDER, date_folder)

    os.makedirs(save_path, exist_ok=True)

    filename = datetime.now().strftime("%H%M%S_") + uploaded_file.filename
    file_path = os.path.join(save_path, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(uploaded_file.file, buffer)

    return file_path


# OCR FUNCTION
def extract_text_from_image(image_path):

    image = Image.open(image_path).convert("RGB")
    image_np = np.array(image)

    results = reader.readtext(image_np)

    texts = []

    for bbox, text, conf in results:

        (tl, tr, br, bl) = bbox
        x1, y1 = int(tl[0]), int(tl[1])
        x2, y2 = int(br[0]), int(br[1])

        pad = 8
        x1 = max(0, x1 - pad)
        y1 = max(0, y1 - pad)
        x2 = min(image_np.shape[1], x2 + pad)
        y2 = min(image_np.shape[0], y2 + pad)

        crop = image_np[y1:y2, x1:x2]

        crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
        crop = Image.fromarray(crop)

        pixel_values = processor(images=crop, return_tensors="pt").pixel_values
        generated_ids = model.generate(pixel_values)

        trocr_text = processor.batch_decode(
            generated_ids, skip_special_tokens=True
        )[0]

        texts.append(trocr_text)

    return " ".join(texts)


# SAVE TO DATABASE
def save_to_database(image_path, description):

    conn = get_connection()

    if conn:
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO Image (Image_Link) VALUES (%s) RETURNING Image_Id;",
            (image_path,)
        )

        image_id = cursor.fetchone()[0]

        cursor.execute(
            "INSERT INTO Image_details (Image_Id, Description) VALUES (%s,%s);",
            (image_id, description)
        )

        conn.commit()
        cursor.close()
        conn.close()

        return True

    return False



# Upload image
@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):

    image_path = save_image(file)

    return {
        "message": "Image uploaded successfully",
        "image_path": image_path
    }


# Extract text
@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):

    image_path = save_image(file)

    text = extract_text_from_image(image_path)

    return {
        "image_path": image_path,
        "extracted_text": text
    }


# Save description
@app.post("/save-description")
async def save_description(
        image_path: str = Form(...),
        description: str = Form(...)
):

    success = save_to_database(image_path, description)

    if success:
        return {"message": "Saved to database"}

    return {"message": "Database error"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
