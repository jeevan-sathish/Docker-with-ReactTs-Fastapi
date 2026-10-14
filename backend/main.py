from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name:str
    age:int

@app.post("/user")
def demo(data:User):
    if(data.name == "jeevan"):
        return {
            "message":"passed congratualtion "  
    }
    raise HTTPException(
        status_code=401,
        detail="not the person"
    )