import asyncio
import logging
from datetime import datetime, timezone
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)

async def process_knowledge_entry(entry_id: str, db: AsyncIOMotorDatabase) -> None:
    """
    Background processing pipeline stub for knowledge entries.
    
    1. Fetches the entry and sets status to "processing".
    2. Simulates work with a 3-second sleep.
    3. If content_type is voice or video, sets a transcript placeholder.
    4. Sets summary and key_insights placeholders.
    5. Sets status to "completed" and saves.
    
    If any error occurs, sets status to "failed" and logs the error.
    This file is intended to contain all AI pipelines so that swapping to real AI
    in Phase 3 will only require changes inside this service file.
    """
    logger.info(f"Initiated background processing for entry_id: {entry_id}")
    
    try:
        obj_id = ObjectId(entry_id)
    except Exception as e:
        logger.error(f"Cannot parse entry_id {entry_id} to ObjectId: {e}")
        return

    try:
        # Fetch the entry
        entry = await db["knowledge_entries"].find_one({"_id": obj_id})
        if not entry:
            logger.error(f"Knowledge entry {entry_id} not found for background processing.")
            return

        # Set status to processing
        await db["knowledge_entries"].update_one(
            {"_id": obj_id},
            {
                "$set": {
                    "status": "processing",
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )
        logger.info(f"Entry {entry_id} status updated to 'processing'.")

        # Simulate background processing duration
        await asyncio.sleep(3)

        # Build updates
        content_type = entry.get("content_type", "text")
        updates = {
            "summary": "[Summary placeholder — to be generated in Phase 3]",
            "key_insights": ["Placeholder insight 1", "Placeholder insight 2"],
            "status": "completed",
            "updated_at": datetime.now(timezone.utc)
        }

        if content_type in ["voice", "video"]:
            updates["transcript"] = "[Transcript placeholder — to be generated in Phase 3]"

        # Save updates
        await db["knowledge_entries"].update_one(
            {"_id": obj_id},
            {"$set": updates}
        )
        logger.info(f"Background processing completed successfully for entry {entry_id}.")

    except Exception as e:
        logger.error(f"Error encountered during background processing of entry {entry_id}: {e}", exc_info=True)
        try:
            await db["knowledge_entries"].update_one(
                {"_id": obj_id},
                {
                    "$set": {
                        "status": "failed",
                        "updated_at": datetime.now(timezone.utc)
                    }
                }
            )
        except Exception as save_err:
            logger.critical(f"Failed to set status to 'failed' for entry {entry_id}: {save_err}")
