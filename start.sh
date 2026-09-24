#!/bin/sh
set -e

echo "=========================================="
echo "      STARTING NOTIX NEXUS PLATFORM       "
echo "=========================================="

# Select Dashboard: 'nextjs' or 'ejs' (default: ejs)
DASHBOARD_MODE="${DASHBOARD_TYPE:-ejs}"

if [ "$DASHBOARD_MODE" = "nextjs" ]; then
    echo "[Dashboard] Starting Next.js Dashboard on port 3000..."
    npm run start --workspace=packages/dashboard &
else
    echo "[Dashboard] Starting Express/EJS Dashboard on port 3000..."
    cd /app/packages/bot-python/dashboard
    node server.js &
fi

echo "[Bot] Starting NOTIX NEXUS Python Bot & API..."
cd /app/packages/bot-python
exec python3 main.py
