from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment."""

    model_config = SettingsConfigDict(env_file=".env")

    app_name: str = "Fashion ERP API"
    log_level: str = "INFO"
    allowed_origins: list[str] = ["http://localhost:3000"]


settings = Settings()  # type: ignore[misc]
