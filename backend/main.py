from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os
import easyocr
import cv2
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

# Initialize Transformers processor and model
processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

def run_ocr(img_path):
    image = cv2.imread(img_path)
    results = reader.readtext(image)

    texts = []

    for bbox, text, conf in results:
        (tl, tr, br, bl) = bbox
        x1, y1 = int(tl[0]), int(tl[1])
        x2, y2 = int(br[0]), int(br[1])

        pad = 8
        x1 = max(0, x1-pad)
        y1 = max(0, y1-pad)
        x2 = min(image.shape[1], x2+pad)
        y2 = min(image.shape[0], y2+pad)

        crop = image[y1:y2, x1:x2]
        crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
        crop = Image.fromarray(crop)

        pixel_values = processor(images=crop, return_tensors="pt").pixel_values
        generated_ids = model.generate(pixel_values, max_new_tokens=50)

        trocr_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        texts.append(trocr_text)

    final_text = " ".join(texts)
    return final_text

@app.post("/api/ocr")
async def process_ocr(image: UploadFile = File(...)):
    # Save the uploaded image temporarily
    os.makedirs("temp", exist_ok=True)
    file_path = f"temp/{image.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    try:
        # Run the OCR pipeline
        extracted_text = run_ocr(file_path)
    finally:
        # Optionally clean up the temp file
        if os.path.exists(file_path):
            os.remove(file_path)
            
    return {"text": extracted_text}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
