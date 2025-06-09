from fastapi import APIRouter

router = APIRouter(prefix="/api/v1")


@router.get("/health", tags=["system"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
