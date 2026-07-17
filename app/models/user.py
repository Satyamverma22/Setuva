from datetime import datetime
from typing import Literal, Annotated
from pydantic import BaseModel, EmailStr, Field, BeforeValidator, ConfigDict

# Custom type to handle MongoDB ObjectId serialization in Pydantic v2
PyObjectId = Annotated[str, BeforeValidator(str)]

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: Literal["contributor", "learner", "both"]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    name: str
    email: EmailStr
    role: Literal["contributor", "learner", "both"]
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

class UserInDB(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    name: str
    email: EmailStr
    role: Literal["contributor", "learner", "both"]
    hashed_password: str
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )
