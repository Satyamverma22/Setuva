from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGO_URI: str
    MONGO_DB_NAME: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    MAX_UPLOAD_SIZE_MB: int = 100
    UPLOAD_DIR: str = "uploads"
    OPENAI_API_KEY: str
    WHISPER_MODEL: str = "whisper-1"
    ANTHROPIC_API_KEY: str
    SUMMARIZATION_MODEL: str = "claude-sonnet-4-6"
    MAX_PROCESSING_ATTEMPTS: int = 3
    PROCESSING_STALE_MINUTES: int = 30
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIMENSIONS: int = 1536
    USE_ATLAS_VECTOR_SEARCH: bool = False
    ATLAS_VECTOR_INDEX_NAME: str = "knowledge_embedding_index"
    LOCAL_VECTOR_CANDIDATE_LIMIT: int = 2000


    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
