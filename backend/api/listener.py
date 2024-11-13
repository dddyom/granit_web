from fastapi import APIRouter

from services.listener import LISTENER

router = APIRouter(prefix="/listener")


router = APIRouter(prefix="/listener")


@router.post('/on')
async def turn_on_listener():
    try:
        LISTENER.start()
        return {"status": True}
    except Exception as e:
        return {"status": False}


@router.post('/off')
async def turn_off_listener():
    try:
        LISTENER.stop()
        return {"status": True}
    except Exception as e:
        return {"status": False}
