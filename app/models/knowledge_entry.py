from datetime import datetime
from typing import Literal, Annotated, Optional
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict

PyObjectId = Annotated[str, BeforeValidator(str)]

CategoryType = Literal[
    "Healthcare",
    "Agriculture",
    "Engineering",
    "Education",
    "Business",
    "Technology",
    "Traditional Knowledge"
]

class KnowledgeEntryCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10)
    category: CategoryType

class KnowledgeEntryUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=200)
    description: Optional[str] = Field(None, min_length=10)
    category: Optional[CategoryType] = None
    status: Optional[str] = None

class KnowledgeEntryOut(BaseModel):
    id: PyObjectId = Field(..., alias="_id")
    contributor_id: PyObjectId
    title: str
    description: str
    category: CategoryType
    status: Literal["draft", "uploaded", "processing", "completed", "failed"] = "draft"
    created_at: datetime
    updated_at: datetime
    content_type: Literal["text", "voice", "video", "document"] = "text"
    file_url: Optional[str] = None
    file_size_bytes: Optional[int] = None
    transcript: Optional[str] = None
    summary: Optional[str] = None
    key_insights: list[str] = []
    language: Optional[str] = None
    score: Optional[float] = None

    model_config = ConfigDict(

        populate_by_name=True,
        from_attributes=True
    )

