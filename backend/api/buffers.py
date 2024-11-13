import json
import os
from pathlib import Path
from typing import List

import yolov5
from fastapi import APIRouter, File, UploadFile

from services import Predictor, dat_to_jpg, parse_ico_targets
from utils import WEIGHTS_PATH, TargetResponse, save_temp_file
from ws import WS_MANAGER

router = APIRouter(prefix="/buffers")


@router.post('/search')
async def search_targets(files: List[UploadFile] = File(...)):
    model = yolov5.load(Path(f'{WEIGHTS_PATH}/best.pt'))
    dat_files = [
        file for file in files if file.filename and file.filename.endswith(".dat")]

    for file in sorted(dat_files, key=lambda x: x.filename or ""):
        buf_name, extension = file.filename.split(
            ".") if file.filename else (None, "dat")
        tmp_file = await save_temp_file(file, extension=extension)
        img_file = dat_to_jpg(tmp_file)

        for target in Predictor(img_file, model).targets():  # pyright: ignore
            target = TargetResponse(
                **target._asdict(), label=target.format_title(), origin_buf_name=buf_name or "")
            message = json.dumps(target.model_dump())
            await WS_MANAGER.send_message(message)

        os.remove(tmp_file)

    txt_files = [
        file for file in files if file.filename and file.filename.endswith(".txt")]
    ico_targets = parse_ico_targets(txt_files)

    return {"status": True, "ico_targets": ico_targets}
