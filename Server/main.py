from io import BytesIO

from fastapi import FastAPI, File, Path, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from nlp import cosine, get_drugs, get_result
from ocr import TextRecognizer
from models import Drug

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


students = {
    1: {"name": "John", "age": 17, "year": "year 12"},
}


@app.get("/")
async def index():
    return {"name": "initial data"}


@app.post("/files")
async def create_upload_file(file: UploadFile = File(...)):
    drug = Drug()
    contents = await file.read()
    try:
        tr = TextRecognizer(contents)
        # print(tr.clean_text())
    except:
        raise ("Image not supported")

    extracted_text = tr.clean_text()
    drug_composition = get_drugs(extracted_text)

    
    if not drug_composition:
        drug_composition = get_drugs(extracted_text.lower())
        if not drug_composition:
            return drug


    drug_name = cosine(drug_composition)
    if not drug_name:
        return drug
    result = get_result(drug_name)

    drug.is_drug_found = True
    drug.uses = result["Uses"]
    drug.side_effects = result["Side_effects"]
    drug.drug_name = drug_name

    return drug
