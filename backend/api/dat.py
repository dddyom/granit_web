import os

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse

from services import dat_to_jpg
from utils import save_temp_file

router = APIRouter(prefix="/dat")


@router.post('/to_jpg')
async def search_targets(file: UploadFile = File(...)):
    buf_name, extension = file.filename.split(
        ".") if file.filename else (None, "dat")
    tmp_file = await save_temp_file(file, extension=extension)
    img_file = dat_to_jpg(tmp_file)
    os.remove(tmp_file)

    return FileResponse(img_file, media_type="image/jpeg", filename=f"{buf_name}.jpg")
