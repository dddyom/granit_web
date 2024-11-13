from pydantic import BaseModel, Field


class TargetResponse(BaseModel):
    azimuth: float
    distance: float
    conf: float
    center_x: float
    center_y: float
    label: str
    buf_name: str = Field(None, alias="origin_buf_name")


class IcoTargetResponse(BaseModel):
    azimuth: float
    distance: float
    center_x: float
    center_y: float
    label: str
    type: str
    buf_name: str
