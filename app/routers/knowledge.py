from typing import List, Optional, Literal
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Query, status, HTTPException, BackgroundTasks, File, UploadFile, Form
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from app.database import get_database
from app.core.dependencies import get_current_user
from app.models.knowledge_entry import KnowledgeEntryCreate, KnowledgeEntryUpdate, KnowledgeEntryOut, CategoryType
from app.services import knowledge_service
from app.services.file_service import save_upload_file
from app.services.processing_service import process_knowledge_entry


router = APIRouter(prefix="/knowledge", tags=["knowledge"])

@router.post("", response_model=KnowledgeEntryOut, status_code=status.HTTP_201_CREATED)
async def create_entry(
    entry_in: KnowledgeEntryCreate,
    current_user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Create a new knowledge entry.
    
    Associates the entry's contributor_id with the ID of the currently logged-in user.
    """
    contributor_id = str(current_user["_id"])
    entry = await knowledge_service.create_knowledge_entry(db, contributor_id, entry_in)
    return entry

@router.get("", response_model=List[KnowledgeEntryOut])
async def list_entries(
    category: Optional[CategoryType] = Query(None, description="Filter by category"),
    contributor_id: Optional[str] = Query(None, description="Filter by contributor ID"),
    skip: int = Query(0, ge=0, description="Skip entries for pagination"),
    limit: int = Query(20, ge=1, le=100, description="Limit result count"),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    List knowledge entries.
    
    Supports filtering by category and contributor ID, with pagination skip and limit.
    """
    entries = await knowledge_service.get_knowledge_entries(
        db, category=category, contributor_id=contributor_id, skip=skip, limit=limit
    )
    return entries

@router.get("/{id}", response_model=KnowledgeEntryOut)
async def get_entry(
    id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get a single knowledge entry details.
    
    Raises 404 error if the entry cannot be found by ID.
    """
    entry = await knowledge_service.get_knowledge_entry_by_id(db, id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge entry not found"
        )
    return entry

@router.put("/{id}", response_model=KnowledgeEntryOut)
async def update_entry(
    id: str,
    entry_in: KnowledgeEntryUpdate,
    current_user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Update a knowledge entry.
    
    Requires the current authenticated user to be the original contributor of the entry.
    """
    user_id = str(current_user["_id"])
    entry = await knowledge_service.update_knowledge_entry(db, id, user_id, entry_in)
    return entry

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_entry(
    id: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Delete a knowledge entry.
    
    Requires the current authenticated user to be the original contributor of the entry.
    """
    user_id = str(current_user["_id"])
    await knowledge_service.delete_knowledge_entry(db, id, user_id)
    return None

@router.post("/{id}/upload", response_model=KnowledgeEntryOut)
async def upload_file(
    id: str,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    content_type: Literal["voice", "video", "document"] = Form(...),
    current_user: dict = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Upload a media/document file associated with a knowledge entry.
    
    Only the entry's contributor can upload to it.
    Validates file via file_service, saves it, updates entry with file details,
    sets status to 'uploaded', and triggers background processing.
    """
    entry = await knowledge_service.get_knowledge_entry_by_id(db, id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge entry not found"
        )
        
    if str(entry["contributor_id"]) != str(current_user["_id"]):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to upload files to this knowledge entry"
        )

    # Save file and validate content-type and size via file_service
    file_url, file_size_bytes = await save_upload_file(
        file=file,
        content_type=content_type,
        contributor_id=str(current_user["_id"]),
        entry_id=id
    )

    # Update knowledge entry status and fields
    now = datetime.now(timezone.utc)
    await db["knowledge_entries"].update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "file_url": file_url,
                "content_type": content_type,
                "file_size_bytes": file_size_bytes,
                "status": "uploaded",
                "updated_at": now
            }
        }
    )

    # Fetch the updated entry
    updated_entry = await knowledge_service.get_knowledge_entry_by_id(db, id)
    
    # Trigger background processing pipeline
    background_tasks.add_task(process_knowledge_entry, id, db)

    return updated_entry

@router.get("/{id}/status")
async def get_entry_status(
    id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get the processing status of a knowledge entry (lightweight endpoint for polling).
    """
    entry = await knowledge_service.get_knowledge_entry_by_id(db, id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge entry not found"
        )
    return {
        "id": id,
        "status": entry.get("status", "draft")
    }

