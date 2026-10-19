#!/bin/bash
# Render / container startup script for the GeoTrade backend.
set -euo pipefail

# Render injects PORT; default for any other host.
PORT="${PORT:-8000}"

echo "Starting GeoTrade backend on port ${PORT}..."

# Apply migrations, but never block the app on them. If this fails the process
# still starts so /health stays reachable, and the reason is printed rather than
# swallowed by `|| echo`.
if alembic upgrade head; then
    echo "Migrations applied."
else
    echo "WARNING: 'alembic upgrade head' failed — starting without migrating." >&2
    echo "WARNING: database-backed endpoints will error until the schema is fixed." >&2
fi

# One worker by default: each uvicorn process runs its own market-feed poll loop
# and WebSocket broadcaster, so extra workers multiply upstream provider requests
# against the same free-tier quota and duplicate the in-process caches. Raise
# WEB_CONCURRENCY only alongside a proportionally higher provider quota.
exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT}" --workers "${WEB_CONCURRENCY:-1}"
