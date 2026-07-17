import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, get_database
from app.routers import auth, users, knowledge, search

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup database connection
    connect_to_mongo()
    db = get_database()
    try:
        # Ping MongoDB to verify connection
        await db.command("ping")
        logger.info("Successfully connected and pinged MongoDB!")
        
        # Create MongoDB text index if it doesn't exist
        index_name = await db["knowledge_entries"].create_index(
            [
                ("title", "text"),
                ("description", "text"),
                ("transcript", "text"),
                ("summary", "text")
            ],
            name="knowledge_entries_text_index"
        )
        logger.info(f"MongoDB text index verified/created: {index_name}")
    except Exception as e:
        logger.critical(f"Database setup or connection ping failed: {e}")
        
    yield
    
    # Clean up and close connection
    close_mongo_connection()

app = FastAPI(
    title="Knowledge Preservation Platform API",
    description="Backend API for the Knowledge Preservation Platform (Phase 2)",
    version="2.0.0",
    lifespan=lifespan
)

# Configure CORS origins
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(knowledge.router)
app.include_router(search.router)


@app.get("/health", tags=["health"])
async def health_check():
    """
    Perform a health check on the application.
    """
    return {"status": "ok"}
