import sys

from loguru import logger as log

log.remove()
log.add(sys.stdout, format="<level>{message}</level>")
