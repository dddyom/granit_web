FROM python:3.12

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN pip install --upgrade pip
RUN pip install poetry

# Отключаем виртуальные окружения и устанавливаем зависимости
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

COPY . .

EXPOSE 9200
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9200"]
