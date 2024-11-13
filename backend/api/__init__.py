from fastapi import APIRouter

from .buffers import router as buffers_router
from .dat import router as dat_router
from .listener import router as listener_router

router = APIRouter()
router.include_router(buffers_router)
router.include_router(listener_router)
router.include_router(dat_router)
