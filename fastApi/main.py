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

UPLOADS_DIR = "T:\\AI_PROJECT\\server\\uploads\\"
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


