from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.models.user import UserOut

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserOut)
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Retrieve the current authenticated user's profile information.
    
    Requires a valid JWT access token in the Authorization header.
    """
    return current_user
