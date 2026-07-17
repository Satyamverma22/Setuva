from typing import List, Optional, Literal
from fastapi import APIRouter, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_database
from app.models.knowledge_entry import KnowledgeEntryOut, CategoryType

router = APIRouter(prefix="/search", tags=["search"])

@router.get("", response_model=List[KnowledgeEntryOut])
async def search_entries(
    q: Optional[str] = Query(None, description="Search query string"),
    category: Optional[CategoryType] = Query(None, description="Filter by category"),
    content_type: Optional[Literal["text", "voice", "video", "document"]] = Query(None, description="Filter by content type"),
    skip: int = Query(0, ge=0, description="Skip entries for pagination"),
    limit: int = Query(20, ge=1, le=100, description="Limit result count"),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Search knowledge entries.

    If query parameter 'q' is provided, performs a text search using MongoDB's $text
    operator and sorts the results by relevance (textScore).
    If 'q' is missing or empty, falls back to a standard filtered listing of entries.
    """
    if q and q.strip():
        # Text search logic
        query = {"$text": {"$search": q}}
        if category:
            query["category"] = category
        if content_type:
            query["content_type"] = content_type

        # Project textScore so pydantic can validate and deserialize it
        projection = {"score": {"$meta": "textScore"}}

        cursor = (
            db["knowledge_entries"]
            .find(query, projection)
            .sort([("score", {"$meta": "textScore"})])
            .skip(skip)
            .limit(limit)
        )
        results = await cursor.to_list(length=limit)
    else:
        # Fallback logic for normal filtered query
        query = {}
        if category:
            query["category"] = category
        if content_type:
            query["content_type"] = content_type

        cursor = db["knowledge_entries"].find(query).skip(skip).limit(limit)
        results = await cursor.to_list(length=limit)

    return results
