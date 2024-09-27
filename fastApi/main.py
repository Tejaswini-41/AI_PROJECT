













from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173", 
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello guys"}










# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# from sentence_transformers import SentenceTransformer, util
# import fitz
# import pytesseract
# from PIL import Image
# from dotenv import load_dotenv
# import io
# import docx
# import os
# import re
# import nltk

# nltk.download('stopwords')
# from nltk.corpus import stopwords
# stop_words = set(stopwords.words('english'))

# app = FastAPI()
# load_dotenv(dotenv_path='.env')

# origins = [
#     "http://localhost:5173", 
#     "http://localhost:3000"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins= origins,  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # logging.basicConfig(level=logging.INFO)


# # Load pre-trained sentence embedding model
# model = SentenceTransformer('all-MiniLM-L6-v2')

# # MongoDB connection
# client = MongoClient(os.getenv("MONGO_URI"))
# db = client["similarityDet"]

# # Within the same database
# users_collection = db["users"]
# assignments_collection = db["assignments"]


# @app.get("/")
# async def read_root():
#     return {"message": "Hello, World!"}

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # For Windows

# # Text Preprocessing
# def preprocess_text(text):
#     text = text.lower()
#     text = re.sub(r'[^\w\s]', '', text)
#     text = re.sub(r'\d+', '', text)
#     text = ' '.join(word for word in text.split() if word not in stop_words)
#     return text

# # File extraction functions (same as your original)
# def extract_text_and_images_from_pdf(pdf_file):
#     pdf_document = fitz.open(stream=pdf_file.read(), filetype='pdf')
#     all_text, all_images_ocr = [], []

#     for page_num in range(len(pdf_document)):
#         page = pdf_document.load_page(page_num)
#         text = page.get_text()
#         all_text.append(text)

#         for img in page.get_images(full=True):
#             xref = img[0]
#             base_image = pdf_document.extract_image(xref)
#             image_bytes = base_image["image"]
#             image = Image.open(io.BytesIO(image_bytes))
#             ocr_text = pytesseract.image_to_string(image)
#             all_images_ocr.append(ocr_text)

#     return "\n".join(all_text), "\n".join(all_images_ocr)

# def extract_text_from_word(docx_file):
#     doc = docx.Document(io.BytesIO(docx_file.read()))
#     return "\n".join([para.text for para in doc.paragraphs])

# def extract_text_from_txt(txt_file):
#     return txt_file.read().decode('utf-8')

# def extract_content(file: UploadFile):
#     if file.content_type == 'application/pdf':
#         return extract_text_and_images_from_pdf(file.file)
#     elif file.content_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
#         return extract_text_from_word(file.file), ""
#     elif file.content_type == 'text/plain':
#         return extract_text_from_txt(file.file), ""
#     else:
#         raise ValueError("Unsupported file format")

# # Similarity comparison using sentence embeddings
# @app.post("/compare-assignments/")
# async def compare_assignments(task_id: str, files: list[UploadFile]):
#     all_texts = []

#     # Extract and process each file
#     for file in files:
#         text, ocr_text = extract_content(file)
#         processed_text = preprocess_text(text + " " + ocr_text)
#         all_texts.append(processed_text)

#     # Compute sentence embeddings
#     embeddings = model.encode(all_texts, convert_to_tensor=True)

#     # Compute cosine similarities
#     cosine_sim_matrix = util.pytorch_cos_sim(embeddings, embeddings)

#     # Store results in MongoDB
#     results = []
#     num_files = len(files)
#     for i in range(num_files):
#         for j in range(i + 1, num_files):
#             similarity = cosine_sim_matrix[i][j].item()
#             results.append({
#                 "task_id": task_id,
#                 "student_1": files[i].filename,
#                 "student_2": files[j].filename,
#                 "similarity": similarity
#             })

#     db.similarity_results.insert_many(results)
#     return {"message": "Similarity comparison completed", "results": results}










