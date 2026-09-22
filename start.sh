#!/bin/bash
# Render startup script for GeoTrade backend

set -e

echo "Starting GeoTrade backend..."

# Run migrations
echo "Running database migrations..."
alembic upgrade head || echo "Migration failed or already applied"

# Start the application
echo "Starting FastAPI server..."
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 2
