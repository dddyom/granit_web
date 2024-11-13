FROM python:3.12

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN pip install --upgrade pip
RUN pip install poetry

# Отключаем виртуальные окружения и устанавливаем зависимости
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

COPY . .

EXPOSE 9200

# Запускаем приложение с помощью uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9200"]
