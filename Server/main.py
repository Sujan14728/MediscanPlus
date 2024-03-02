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
        return {"extracted_text":tr.clean_text()}
    except:
<<<<<<< HEAD
        raise ("Image not supported")

    drug_composition = get_drugs(tr.clean_text())
    if not drug_composition:
        return drug
    drug_name = cosine(drug_composition)
    result = get_result(drug_name)
=======
        raise("Image not supported")
    




# students = {
#     1: {
#         "name": "John",
#         "age": 17,
#         "year": "year 12"
#     },
# }

# @app.get("/")
# async def index():
#     return {"name":"initial data"}

# @app.get("/get-students/{student_id}")
# async def get_student(student_id:int):
#     return students[student_id]

# @app.get("/get-by-name")
# async def get_student(name:str | None=None):
#     for student_id in students:
#         if students[student_id]["name"] ==name:
#             return students[student_id]
#     return {"Data":"Not found"}
    

# @app.post("/create-student/{student_id}")
# async def create_student(student_id:int,student:Student):
#     if student_id in students:
#         return {"Error":"student already exists"}
#     students[student_id] = student
#     return students[student_id]

# @app.put("/update-student/{student_id}") 
# async def updata_student(student_id:int,student:UpdateStudent):
#     if student_id not in students:
#         return {"Error":"Student doesnot exists"}
#     students[student_id] = student
#     return students[student_id]

# @app.post("/uploadimage")
# async def upload_image(image: UploadFile = File(...)):

#     image.filename = f"{uuid.uuid4()}.jpg"
#     contents = await image.read()

#     with open(f"uploaded_images/{image.filename}", "wb") as f:
#         f.write(contents)
#     data={
#         "name":"Paracetamol",
#         "uses":"Pain killer"
#     }
#     return data
>>>>>>> 5238f32 (bug)

    drug.is_drug_found = True
    drug.uses = result["Uses"]
    drug.side_effects = result["Side_effects"]
    drug.drug_name = drug_name

    return drug
