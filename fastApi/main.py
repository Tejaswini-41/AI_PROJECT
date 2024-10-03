from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer, util
import uvicorn
import os
import fitz  # PyMuPDF for PDFs
import docx2txt

app = FastAPI()

# CORS middleware setup
origins = [
    "http://localhost:5173",  # Frontend URL
    "http://localhost:3000"    # Other potential frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the SentenceTransformer model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Directory where uploaded files are stored
UPLOADS_DIR = "T:\\AI_project\\server\\uploads\\"

# Function to extract text from files (PDF or DOCX)
def extract_text_from_file(file_path):
    _, file_extension = os.path.splitext(file_path)
    
    if file_extension.lower() == ".pdf":
        text = ""
        with fitz.open(file_path) as pdf_document:
            for page in pdf_document:
                text += page.get_text()
        return text.strip()  # Strip whitespace
    
    elif file_extension.lower() == ".docx":
        text = docx2txt.process(file_path)
        return text.strip()  # Strip whitespace
    
    else:
        return None  # Handle other file formats if needed

@app.post("/similarity-db")
async def check_similarity():
    # List all files in the uploads directory
    file_names = os.listdir(UPLOADS_DIR)
    
    if not file_names:
        return {"message": "No files found in the uploads directory."}
    
    # Full file paths
    file_paths = [os.path.join(UPLOADS_DIR, file_name) for file_name in file_names]

    # Extract text from all files
    documents = [extract_text_from_file(file_path) for file_path in file_paths]
    
    # Filter out None values (files that couldn't be processed)
    documents = [doc for doc in documents if doc is not None]

    if not documents:
        return {"message": "No valid text extracted from files."}

    # Generate embeddings
    embeddings = model.encode(documents, convert_to_tensor=True)

    # Calculate similarity scores
    similarity_matrix = util.cos_sim(embeddings, embeddings).cpu().numpy()

    # Create a similarity report for files with similarity > 60%
    similarity_threshold = 0.60
    similarity_report = []

    # Iterate over the similarity matrix correctly
    for i in range(len(documents)):
        for j in range(i + 1, len(documents)):
            similarity_score = float(similarity_matrix[i][j])
            if similarity_score >= similarity_threshold:
                similarity_report.append({
                    "file1": file_names[i],
                    "file2": file_names[j],
                    "similarity_score": round(similarity_score * 100, 2)  # Convert to percentage
                })

    # If no similarity reports are found, return a message
    if not similarity_report:
        return {"message": "No files with similarity greater than 60% found."}

    # Return the similarity report
    return {"similarity_report": similarity_report}

if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')




# from fastapi import FastAPI, UploadFile, File as UploadFileType
# from fastapi.middleware.cors import CORSMiddleware
# from sentence_transformers import SentenceTransformer, util
# import os
# import fitz  # PyMuPDF for PDFs
# import docx2txt
# import numpy as np

# app = FastAPI()

# # CORS middleware setup
# origins = [
#     "http://localhost:5173", 
#     "http://localhost:3000"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load the sentence transformer model
# model = SentenceTransformer('all-MiniLM-L6-v2')  # Choose a model suitable for your needs

# # Directory where the uploaded files are stored
# UPLOAD_DIR = "T:\\AI_project\\server\\uploads\\"

# # Function to extract text from PDF files
# def extract_text_from_pdf(file_path):
#     text = ""
#     with fitz.open(file_path) as doc:
#         for page in doc:
#             text += page.get_text()
#     return text

# # Function to extract text from DOCX files
# def extract_text_from_docx(file_path):
#     return docx2txt.process(file_path)

# # Function to load all assignments from the upload directory
# def load_assignments():
#     assignments = {}
#     for filename in os.listdir(UPLOAD_DIR):
#         file_path = os.path.join(UPLOAD_DIR, filename)
#         if filename.endswith('.pdf'):
#             text = extract_text_from_pdf(file_path)
#         elif filename.endswith('.docx'):
#             text = extract_text_from_docx(file_path)
#         else:
#             continue  # Skip files that are not PDF or DOCX

#         assignments[filename] = text
#     return assignments

# # API endpoint to check similarity
# @app.post("/similarity")
# async def check_similarity():
#     assignments = load_assignments()
#     if not assignments:
#         return {"message": "No assignments found"}

#     # Create embeddings for each assignment
#     embeddings = model.encode(list(assignments.values()), convert_to_tensor=True)

#     # Compute cosine similarity matrix
#     cosine_similarities = util.pytorch_cos_sim(embeddings, embeddings)

#     results = {}
#     for i, (file1, sim_scores) in enumerate(zip(assignments.keys(), cosine_similarities)):
#         results[file1] = {}
#         for j, score in enumerate(sim_scores):
#             file2 = list(assignments.keys())[j]
#             results[file1][file2] = float(score)

#     return {"similarity_results": results}



# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# from sentence_transformers import SentenceTransformer, util
# import fitz  # PyMuPDF for PDFs
# import os
# import docx2txt

# app = FastAPI()

# # CORS middleware setup
# origins = [
#     "http://localhost:5173", 
#     "http://localhost:3000"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# client = MongoClient(os.getenv('MONGO_URI'))
# db = client["similarityDet"]
# file_collection = db.get_collection("files")


# print(list(file_collection.find({})))


# # Load the sentence transformer model
# model = SentenceTransformer('all-MiniLM-L6-v2')
# # Directory where uploaded files are stored
# UPLOADS_DIR = "T:\\AI_project\\server\\uploads\\"

# # Function to extract text from files (PDF or DOCX)
# def extract_text_from_file(file_path):
#     _, file_extension = os.path.splitext(file_path)
    
#     if file_extension.lower() == ".pdf":
#         text = ""
#         with fitz.open(file_path) as pdf_document:
#             for page in pdf_document:
#                 text += page.get_text()
#         return text
    
#     elif file_extension.lower() == ".docx":
#         return docx2txt.process(file_path)
    
#     else:
#         return None  # Handle other file formats if needed

# @app.post("/similarity")
# async def check_similarity():
#     # Fetch all assignments from the database
#     files = list(file_collection.find({}))
    
#     if not files:
#         return {"message": "No assignments found in the database"}

#     # Get file paths and names
#     file_paths = []
#     file_names = []
    
#     for file in files:
#         file_path = os.path.join(UPLOADS_DIR, file['filename'])  # Use stored 'path' or 'filename'
#         if os.path.exists(file_path):  # Ensure the file exists on the file system
#             file_paths.append(file_path)
#             file_names.append(file['originalname'])

#     if not file_paths:
#         return {"message": "No valid files found in the uploads directory"}

#     # Extract text from all files
#     documents = [extract_text_from_file(file_path) for file_path in file_paths]
    
#     if not any(documents):
#         return {"message": "No valid text extracted from files"}

#     # Generate embeddings
#     embeddings = model.encode(documents, convert_to_tensor=True)

#     # Calculate similarity scores
#     similarity_matrix = util.cos_sim(embeddings, embeddings).cpu().numpy()

#     # Create a similarity report for files with similarity > 60%
#     similarity_threshold = 0.60
#     similarity_report = []

#     for i in range(len(file_names)):
#         for j in range(i + 1, len(file_names)):
#             similarity_score = float(similarity_matrix[i][j])
#             if similarity_score >= similarity_threshold:
#                 similarity_report.append({
#                     "file1": file_names[i],
#                     "file2": file_names[j],
#                     "similarity_score": round(similarity_score * 100, 2)  # Convert to percentage
#                 })

#     # If no similarity reports are found, return a message
#     if not similarity_report:
#         return {"message": "No files with similarity greater than 60% found."}

#     # Return the similarity report
#     return {"similarity_report": similarity_report}