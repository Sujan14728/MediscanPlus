from fastapi import FastAPI,Path,File,UploadFile
from pydantic import BaseModel
from .ocr import TextRecognizer

class Student(BaseModel):
    name:str
    age:int
    year:str

class UpdateStudent(BaseModel):
    name:str |None=None
    age:int |None=None
    year:str |None=None

app = FastAPI()

# tr = TextRecognizer("")

@app.get("/")
async def index():
    return {"name":"initial data"}

@app.post("/files/")
async def create_upload_file(file:UploadFile=File(...)):
    tr = TextRecognizer(file.filename)
    return {"extracted_text":tr.clean_text()}




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



