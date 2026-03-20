import easyocr
import cv2
from cv2 import dnn_superres
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import shutil
import psycopg2
import numpy as np
import os
from datetime import datetime
import re
import fitz  
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD MODELS
reader = easyocr.Reader(['en'])

processor = TrOCRProcessor.from_pretrained("microsoft/trocr-large-handwritten", trust_remote_code=True)
model = VisionEncoderDecoderModel.from_pretrained(
    "microsoft/trocr-large-handwritten",
    trust_remote_code=True,

)

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
def extract_text_from_image(image_input):

    if isinstance(image_input, str): 
            # It's a file path

        image = preprocess_image(image_input)
        image_np = np.array(image)
    else:
            
        image_np = np.array(image_input)
            
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
  
        image_np = sr.upsample(image_np)

    h, w = image_np.shape[:2]
    if max(h, w) < 1500:
        image_np = sr.upsample(image_np)
  
    results = reader.readtext(image_np)

    
    def sort_boxes(results):

        boxes = []

        for bbox, text, prob in results:

            xs = [p[0] for p in bbox]
            ys = [p[1] for p in bbox]

            x_min = min(xs)
            y_min = min(ys)

            boxes.append((bbox, text, prob, x_min, y_min))

        boxes = sorted(boxes, key=lambda x: (x[4], x[3]))

        sorted_results = [(b[0], b[1], b[2]) for b in boxes]

        return sorted_results

    results = sort_boxes(results)

    
    def cluster_boxes_into_lines(results):

        boxes = []

        for bbox, text, prob in results:

            xs = [p[0] for p in bbox]
            ys = [p[1] for p in bbox]

            x_center = sum(xs) / 4
            y_center = sum(ys) / 4
            height = max(ys) - min(ys)

            boxes.append({
                "bbox": bbox,
                "text": text,
                "x": x_center,
                "y": y_center,
                "h": height
            })

        boxes.sort(key=lambda b: b["y"])

        lines = []

        for box in boxes:

            placed = False

            for line in lines:

                avg_y = sum(b["y"] for b in line) / len(line)
                avg_h = sum(b["h"] for b in line) / len(line)

                if abs(box["y"] - avg_y) < avg_h * 0.6:
                    line.append(box)
                    placed = True
                    break

            if not placed:
                lines.append([box])

        for line in lines:
            line.sort(key=lambda b: b["x"])

        return lines

    lines = cluster_boxes_into_lines(results)

    # ---------- CROP LINE ----------
    def crop_line(image_np, line_bboxes, pad=25):

        xs = []
        ys = []

        for bbox in line_bboxes:
            for p in bbox:
                xs.append(p[0])
                ys.append(p[1])

        x1 = max(0, int(min(xs) - pad))
        y1 = max(0, int(min(ys) - pad))

        x2 = min(image_np.shape[1], int(max(xs) + pad))
        y2 = min(image_np.shape[0], int(max(ys) + pad))

        crop = image_np[y1:y2, x1:x2]

        crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)

        return Image.fromarray(crop)

    # ---------- TROCR RECOGNITION ----------
  

    def recognize_text(crop):

        crop = crop.resize((384, 96))

        pixel_values = processor(images=crop, return_tensors="pt").pixel_values

        generated_ids = model.generate(
            pixel_values,
            max_length=128,
            num_beams=4
        )

        text = processor.batch_decode(
            generated_ids,
            skip_special_tokens=True
        )[0]

        text = re.sub(r'\s*\.\s*', ' ', text)

        return text

    cleaned_lines = []
    all_words = []

    for line in lines:

        line_boxes = [b["bbox"] for b in line]

        crop = crop_line(image_np, line_boxes)

        text = recognize_text(crop)

        cleaned_lines.append(text)

        all_words.extend(text.split())

    cleaned_text = "\n".join(cleaned_lines)

    extracted_text = " ".join(all_words)

    return extracted_text, cleaned_text

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


def main():
    file_path = "Test_Images/10.png"   # Can be PDF or image

    if not os.path.exists(file_path):
        print("Input file not found.")
        return
    

    filename = os.path.basename(file_path)
    ext = os.path.splitext(filename)[1].lower()
    
    all_extracted_text = []
    all_cleaned_text = []
    
    if ext == ".pdf":
        print(f"Processing PDF: {filename}")
        
        pdf_images = convert_pdf_to_images(file_path)
        
        for page_num, pil_image in enumerate(pdf_images, 1):
            print(f"Processing page {page_num}...")
            
            extracted_text, cleaned_text = extract_text_from_image(pil_image)
            
            all_extracted_text.append(cleaned_text)
            all_cleaned_text.append(cleaned_text)
            

    
    else:
        print(f"Processing Image: {filename}")
        
        extracted_text, cleaned_text = extract_text_from_image(file_path)
        
        all_extracted_text.append(extracted_text)
        all_cleaned_text.append(cleaned_text)
    
    combined_cleaned = "\n".join(all_cleaned_text)
    print(combined_cleaned)
    

@app.post("/extract-text")
async def api_extract_text(file: UploadFile = File(...)):
    os.makedirs("Test_Images", exist_ok=True)
    temp_path = os.path.join("Test_Images", file.filename)
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    ext = os.path.splitext(file.filename)[1].lower()
    
    all_cleaned_text = []
    if ext == ".pdf":
        pdf_images = convert_pdf_to_images(temp_path)
        for pil_image in pdf_images:
            extracted_text, cleaned_text = extract_text_from_image(pil_image)
            all_cleaned_text.append(cleaned_text)
    else:
        extracted_text, cleaned_text = extract_text_from_image(temp_path)
        all_cleaned_text.append(cleaned_text)
        
    combined_cleaned = "\n".join(all_cleaned_text)
    
    return {"extracted_text": combined_cleaned, "image_path": temp_path}

@app.post("/save-description")
async def api_save_description(image_path: str = Form(...), description: str = Form(...)):
    save_to_database(image_path, description, description)
    return {"message": "Saved successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)