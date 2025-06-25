from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.router import router
from .core import configure_logging, settings
from .core.middleware import ObservabilityMiddleware


def create_app() -> FastAPI:
    configure_logging(settings.log_level, settings.log_json)

    app = FastAPI(title=settings.app_name)
    app.add_middleware(ObservabilityMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(router)
    return app


app = create_app()
