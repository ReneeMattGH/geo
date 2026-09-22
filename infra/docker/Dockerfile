FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=0 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_DEFAULT_TIMEOUT=100 \
    PYTHONIOENCODING=UTF-8

WORKDIR /app

# Install build dependencies for pandas, numpy, and other C-extension packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    gcc \
    python3-dev \
    libpq-dev \
    libgomp1 \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Upgrade pip and install build tools
RUN pip install --upgrade pip setuptools wheel

COPY pyproject.toml .

# Install ONLY production deps with optimizations for build environments
# Use --prefer-binary to avoid building from source when possible
# Set memory limit for numpy build
RUN pip install --prefer-binary --no-cache-dir -e "." || \
    pip install --no-cache-dir -e "."

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Clean up to reduce image size
RUN pip cache purge

# ---- API target ----
FROM base AS api
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]

# ---- Worker target ----
FROM base AS worker
COPY . .
CMD ["celery", "-A", "app.tasks.celery_app", "worker", "--loglevel=info", "--concurrency=4", "-Q", "ingestion,nlp,gti,default"]
