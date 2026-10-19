# syntax=docker/dockerfile:1
#
# GeoTrade backend image.
#
# Installs requirements.txt only — deliberately NOT the torch/transformers/spaCy
# stack. Those are imported lazily behind try/except ImportError, so the API
# boots and serves without them; ~2 GB of ML wheels was what made the hosted
# build run out of memory and fail. Add them with requirements-ml.txt on a host
# that has the RAM for it.

FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONIOENCODING=UTF-8

WORKDIR /app

# libpq for psycopg2, libgomp for numpy/scipy OpenMP, curl for the health probe.
# build-essential is only needed by the builder stage below.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libgomp1 \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install dependencies before copying source so this layer is cached on rebuilds.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run as an unprivileged user; Render's web services ignore USER but this keeps
# local/container scans quiet and prevents accidental writes to site-packages.
RUN useradd --create-home --uid 10001 geotrade && chown -R geotrade:geotrade /app
USER geotrade

ENV PORT=8000

# ---- API target ----
FROM base AS api
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=5 \
    CMD curl -fsS "http://127.0.0.1:${PORT}/health" || exit 1
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT} --workers ${WEB_CONCURRENCY:-1}"]

# ---- Worker target ----
FROM base AS worker
CMD ["celery", "-A", "app.tasks.celery_app", "worker", "--loglevel=info", "--concurrency=4", "-Q", "ingestion,nlp,gti,default"]
