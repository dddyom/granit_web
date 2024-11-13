from typing import List

from fastapi import UploadFile

from utils import IcoTargetResponse


def parse_one_file(txt_file: UploadFile):
    buf_name = (txt_file.filename or "").split(".")[0]
    data = txt_file.file.read().decode('latin-1')

    log_entries = data.strip().splitlines()
    targets = []
    for entry in log_entries:
        parts = entry.replace(" ", "").split(',')
        azimuth = round(float(parts[0].split('=')[1]), 2)
        distance = round(float(parts[1].split('=')[1]) / 1000, 2)
        target_type = parts[2]

        center_x = round((azimuth / 360) * 2048, 3)
        center_y = round((distance / 360) * 1200, 3)

        targets.append(
            IcoTargetResponse(
                azimuth=azimuth,
                distance=distance,
                buf_name=buf_name,
                type=target_type,
                center_x=center_x,
                center_y=center_y,
                label=f"Az = {azimuth:.2f}, D = {distance:.2f}, {target_type}",
            )
        )
    return targets


def parse_ico_targets(txt_files: List[UploadFile]):
    targets = []
    for file in txt_files:
        targets += parse_one_file(file)

    return targets
