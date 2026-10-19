.PHONY: up down test lint lint-fix migrate seed logs build shell secrets check format typecheck

# --- Environment ---
COMPOSE = docker compose
APP_SERVICE = api
WORKER_SERVICE = worker

# docker-compose services declare `env_file: .env`, which is a hard error when the
# file is absent. Create it from the template so a fresh clone can `make up`.
.env:
	cp .env.example .env
	@echo "Created .env from .env.example — add provider keys if you have them."

up: .env
	$(COMPOSE) up -d --build
	@echo "✅ GeoTrade stack is up. API: http://localhost:8000 | Flower: http://localhost:5555"

down:
	$(COMPOSE) down -v

build:
	$(COMPOSE) build --no-cache

migrate:
	$(COMPOSE) exec $(APP_SERVICE) alembic upgrade head

seed:
	$(COMPOSE) exec $(APP_SERVICE) python scripts/seed.py

logs:
	$(COMPOSE) logs -f --tail=100

shell:
	$(COMPOSE) exec $(APP_SERVICE) bash

# --- Local dev (no docker) ---
dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

worker-local:
	celery -A app.tasks.celery_app worker --loglevel=info --concurrency=2 -Q ingestion,nlp,gti,default

migrate-local:
	alembic upgrade head

# --- Testing ---
test:
	pytest tests/ -v --tb=short --cov=app --cov-report=term-missing

test-unit:
	pytest tests/unit/ -v

test-integration:
	pytest tests/integration/ -v

test-contract:
	pytest tests/contract/ -v

test-load:
	pytest tests/load/ -v -s

# --- Code quality ---
# Check-only so `make lint` / CI never rewrites the working tree.
lint:
	ruff check .

lint-fix:
	ruff check . --fix
	ruff format app/ tests/ scripts/

format:
	ruff format app/ tests/ scripts/

# Optional and separate from `lint`: the codebase is not typed strictly enough to
# gate on it, and mypy is not part of the slim install (`pip install mypy`).
typecheck:
	mypy app/ --ignore-missing-imports

# Blocks committing a provider key. Runs on tracked files; add --all to also
# cover untracked-but-not-ignored files.
secrets:
	python scripts/check_secrets.py --all

# Everything CI runs, in one command.
check: secrets lint test
	cd frontend && npm ci && npm run lint && npm run test && npm run build

# --- Alembic ---
revision:
	alembic revision --autogenerate -m "$(message)"

downgrade:
	alembic downgrade -1

# --- Cleanup ---
clean:
	find . -type d -name __pycache__ | xargs rm -rf
	find . -type f -name "*.pyc" -delete
	rm -rf .pytest_cache .coverage htmlcov .mypy_cache .ruff_cache
