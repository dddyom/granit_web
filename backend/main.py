from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import router as api_router
from core import get_settings
from ws import router as ws_router


def get_application() -> FastAPI:
    settings = get_settings()

    app = FastAPI(**settings.fastapi_kwargs)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allow_origins,
        allow_credentials=settings.allow_credentials,
        allow_methods=settings.allow_methods,
        allow_headers=settings.allow_headers,
    )

    app.include_router(api_router, prefix=settings.api_prefix)
    app.include_router(ws_router)

    return app


app = get_application()
