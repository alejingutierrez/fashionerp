from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment."""

    model_config = SettingsConfigDict(env_file=".env")

    app_name: str = "Fashion ERP API"
    log_level: str = "INFO"
    log_json: bool = False
    allowed_origins: list[str] = Field(default_factory=list)
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/app"

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def split_origins(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


settings = Settings()  # type: ignore[misc]
