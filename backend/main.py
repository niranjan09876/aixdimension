import easyocr
import cv2
<<<<<<< HEAD
from cv2 import dnn_superres
=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import psycopg2
import numpy as np
import os
from datetime import datetime
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
<<<<<<< HEAD
import torch
import uvicorn

# -------------------------------
# FASTAPI
# -------------------------------

=======
import uvicorn

>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["*"],
=======
    allow_origins=["*"],   # change to React URL in production
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# -------------------------------
# LOAD MODELS
# -------------------------------

reader = easyocr.Reader(['en'])

processor = TrOCRProcessor.from_pretrained("microsoft/trocr-large-handwritten")

model = VisionEncoderDecoderModel.from_pretrained(
    "microsoft/trocr-large-handwritten"
)

device = torch.device("cpu")

model.to(device)
model.eval()

# Super Resolution
sr = dnn_superres.DnnSuperResImpl_create()
sr.readModel("model/FSRCNN_x4.pb")
sr.setModel("fsrcnn", 4)

# -------------------------------
# DATABASE CONNECTION
# -------------------------------

def get_connection():

=======
# LOAD MODELS (only once at startup)
reader = easyocr.Reader(['en'])
processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")


# DATABASE CONNECTION
def get_connection():
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
    try:
        return psycopg2.connect(
            database="image_data",
            user="postgres",
<<<<<<< HEAD
            password="your_password",
            host="127.0.0.1",
            port=5432
        )

    except Exception as e:

        print("Database Error:", e)

        return None


# -------------------------------
# SAVE IMAGE
# -------------------------------

=======
            password="iamm@Gma422",
            host="127.0.0.1",
            port=5432
        )
    except Exception as e:
        print("Database Error:", e)
        return None


# SAVE IMAGE
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
def save_image(uploaded_file: UploadFile):

    BASE_FOLDER = "OCR_App_Images"

    date_folder = datetime.now().strftime("%Y-%m-%d")
<<<<<<< HEAD

=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
    save_path = os.path.join(BASE_FOLDER, date_folder)

    os.makedirs(save_path, exist_ok=True)

    filename = datetime.now().strftime("%H%M%S_") + uploaded_file.filename
<<<<<<< HEAD

    file_path = os.path.join(save_path, filename)

    with open(file_path, "wb") as buffer:

=======
    file_path = os.path.join(save_path, filename)

    with open(file_path, "wb") as buffer:
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        shutil.copyfileobj(uploaded_file.file, buffer)

    return file_path


<<<<<<< HEAD
# -------------------------------
# IMAGE PREPROCESS
# -------------------------------

def preprocess_image(image_path):

    image = cv2.imread(image_path)

    image = sr.upsample(image)

    return image


# -------------------------------
# OCR PIPELINE
# -------------------------------

def extract_text_from_image(image_path):

    image = preprocess_image(image_path)

    image_np = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
=======
# OCR FUNCTION
def extract_text_from_image(image_path):

    image = Image.open(image_path).convert("RGB")
    image_np = np.array(image)
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863

    results = reader.readtext(image_np)

    texts = []

    for bbox, text, conf in results:

        (tl, tr, br, bl) = bbox
<<<<<<< HEAD

=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        x1, y1 = int(tl[0]), int(tl[1])
        x2, y2 = int(br[0]), int(br[1])

        pad = 8
<<<<<<< HEAD

=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        x1 = max(0, x1 - pad)
        y1 = max(0, y1 - pad)
        x2 = min(image_np.shape[1], x2 + pad)
        y2 = min(image_np.shape[0], y2 + pad)

        crop = image_np[y1:y2, x1:x2]

<<<<<<< HEAD
        crop = Image.fromarray(crop).convert("RGB")

        pixel_values = processor(images=crop, return_tensors="pt").pixel_values.to(device)

        with torch.no_grad():

            generated_ids = model.generate(pixel_values, max_new_tokens=50)

        trocr_text = processor.batch_decode(
            generated_ids,
            skip_special_tokens=True
=======
        crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
        crop = Image.fromarray(crop)

        pixel_values = processor(images=crop, return_tensors="pt").pixel_values
        generated_ids = model.generate(pixel_values)

        trocr_text = processor.batch_decode(
            generated_ids, skip_special_tokens=True
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        )[0]

        texts.append(trocr_text)

    return " ".join(texts)


<<<<<<< HEAD
# -------------------------------
# SAVE TO DATABASE
# -------------------------------

=======
# SAVE TO DATABASE
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
def save_to_database(image_path, description):

    conn = get_connection()

    if conn:
<<<<<<< HEAD

=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
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
<<<<<<< HEAD

=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        cursor.close()
        conn.close()

        return True

    return False


<<<<<<< HEAD
# -------------------------------
# API: Upload Image
# -------------------------------

@app.post("/upload-image")

=======

# Upload image
@app.post("/upload-image")
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
async def upload_image(file: UploadFile = File(...)):

    image_path = save_image(file)

    return {
        "message": "Image uploaded successfully",
        "image_path": image_path
    }


<<<<<<< HEAD
# -------------------------------
# API: Extract Text
# -------------------------------

@app.post("/extract-text")

=======
# Extract text
@app.post("/extract-text")
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
async def extract_text(file: UploadFile = File(...)):

    image_path = save_image(file)

    text = extract_text_from_image(image_path)

    return {
        "image_path": image_path,
        "extracted_text": text
    }


<<<<<<< HEAD
# -------------------------------
# API: Save Description
# -------------------------------

@app.post("/save-description")

async def save_description(

=======
# Save description
@app.post("/save-description")
async def save_description(
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        image_path: str = Form(...),
        description: str = Form(...)
):

    success = save_to_database(image_path, description)

    if success:
<<<<<<< HEAD

=======
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
        return {"message": "Saved to database"}

    return {"message": "Database error"}

<<<<<<< HEAD

# -------------------------------
# RUN SERVER
# -------------------------------

if __name__ == "__main__":

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
=======
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
>>>>>>> 00b86eeab3f6a4c93b18432c2e6a8b4dca07c863
