from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from .manager import WS_MANAGER

router = APIRouter()



@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await WS_MANAGER.connect(websocket)  # Подключаем клиента

    try:
        while True:
            # Ожидание сообщений от клиента, если нужно
            data = await websocket.receive_text()
            print(f"Received from client: {data}")
    except WebSocketDisconnect:
        WS_MANAGER.disconnect(websocket)  # Отключаем клиента
    finally:
        await websocket.close()
