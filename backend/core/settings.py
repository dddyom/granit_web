import os


class Settings:
    allow_origins: list[str] = os.environ.get(
        "ALLOW_ORIGINS", default="http://localhost:5173,http://localhost:9100").split(",")
    allow_methods: list[str] = os.environ.get(
        "ALLOW_METHODS", default="*").split(",")
    allow_headers: list[str] = os.environ.get(
        "ALLOW_HEADERS", default="*").split(",")
    allow_credentials: bool = bool(
        os.environ.get("ALLOW_CREDENTIALS", default="1"))
    api_prefix: str = "/api"

    debug: bool = bool(os.environ.get("DEBUG", default=""))
    title: str = os.environ.get("TITLE", default="granit web")
    version: str = os.environ.get("VERSION", default="1.0.0")

    frontend_url: str = os.environ.get(
        "FRONTEND_URL", default="http://localhost:5173")

    @property
    def fastapi_kwargs(self):
        return {"debug": self.debug, "title": self.title, "version": self.version}

    class Config:
        env_file = ".env"


def get_settings() -> Settings:
    return Settings()
