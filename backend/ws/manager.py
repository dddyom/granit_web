from fastapi import WebSocket, WebSocketDisconnect


class WebSocketManager:
    def __init__(self):
        self.active_connection: WebSocket = None

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connection = websocket

    def disconnect(self, websocket: WebSocket):
        if websocket == self.active_connection:
            self.active_connection = None

    async def send_message(self, message: str):
        """Отправка сообщения по открытому WebSocket"""
        if self.active_connection:
            try:
                await self.active_connection.send_text(message)
            except WebSocketDisconnect:
                self.active_connection = None
            except Exception as e:
                print(f"Error while sending message: {e}")
                self.active_connection = None


WS_MANAGER = WebSocketManager()
