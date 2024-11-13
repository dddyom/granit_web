import asyncio
import json
import os
import time
from pathlib import Path

import yolov5
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

from services.dat_converter import dat_to_jpg
from services.logger import log
from services.predictor import Predictor
from utils import LISTENER_PATH, WEIGHTS_PATH, TargetResponse
from ws import WS_MANAGER


class FolderListener(FileSystemEventHandler):
    def __init__(self, model):
        super().__init__()
        self.model = model

    def on_created(self, event):

        if not event.is_directory and event.src_path:
            time.sleep(1)
            asyncio.run(self.handle_event(Path(str(event.src_path))))

    async def handle_event(self, src_path: Path):
        if src_path.suffix != ".dat":
            return
        img_file = dat_to_jpg(src_path)

        for target in Predictor(img_file, self.model).targets():
            target = TargetResponse(
                **target._asdict(), label=target.format_title(), origin_buf_name=Path(src_path).stem
            )
            message = json.dumps(target.model_dump())
            log.info(message)
            await WS_MANAGER.send_message(message)
        os.remove(img_file)


class FolderObserver:
    def __init__(self):
        self.folder_path = LISTENER_PATH
        self.model = None
        self.observer = None

    def start(self):
        """Запускает наблюдатель."""
        if not self.model:
            self.model = yolov5.load(Path(f'{WEIGHTS_PATH}/best.pt'))
        if self.observer and self.observer.is_alive():
            return

        event_handler = FolderListener(self.model)
        self.observer = Observer()
        self.observer.schedule(event_handler, self.folder_path, recursive=True)
        self.observer.start()

    def stop(self):
        """Останавливает наблюдатель."""
        if self.observer and self.observer.is_alive():
            self.observer.stop()
            self.observer.join()
        else:
            print("Observer is not running.")


LISTENER = FolderObserver()
