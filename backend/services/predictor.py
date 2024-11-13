from dataclasses import dataclass
from pathlib import Path
from typing import Generator, NamedTuple, Self

from yolov5.models.yolo import DetectMultiBackend

IMG_SIZE = 1056


class TargetPoint(NamedTuple):
    buf_name: str
    azimuth: float
    distance: float
    conf: float
    center_x: float
    center_y: float

    def format_title(self, with_buf_name: bool = False) -> str:
        title = f"Az = {self.azimuth:.2f}, D = {self.distance:.2f}, CONF = {self.conf:.2f}"
        if with_buf_name:
            return title + f" ({self.buf_name})"
        return title

@dataclass
class Predictor:
    img_file: Path
    model: DetectMultiBackend

    def targets(self) -> Generator[TargetPoint, None, None]:
        results = self.model(self.img_file, size=IMG_SIZE)

        for det in results.pred[0]:
            azimuth, distance, conf, (center_x,
                                      center_y) = self.format_coords(det)
            yield TargetPoint(self.img_file.stem, azimuth, distance, conf, center_x, center_y)

    @staticmethod
    def format_coords(detection):
        xyxy = detection[:4].tolist()
        conf = detection[4]

        center_x = int(xyxy[0] + ((xyxy[2] - xyxy[0]) / 2))
        center_y = int(xyxy[1] + ((xyxy[3] - xyxy[1]) / 2))
        azimuth = round((center_x / 2048) * 360, 3)
        distance = round((center_y / 1200) * 360, 3)
        return azimuth, distance, conf, (center_x, center_y)

    def __enter__(self) -> Self:
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass
