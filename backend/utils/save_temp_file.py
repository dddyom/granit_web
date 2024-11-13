import tempfile
from pathlib import Path

from fastapi import UploadFile


async def save_temp_file(uploaded_file: UploadFile, extension: str) -> Path:
    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{extension}") as temp_file:
        temp_file.write(await uploaded_file.read())
    return Path(temp_file.name)
