FRONTEND_DIR = frontend
BACKEND_DIR = backend

run-frontend:
	cd $(FRONTEND_DIR) && npm run dev

run-backend:
	cd $(BACKEND_DIR) && poetry run uvicorn main:app --reload --port 9200

