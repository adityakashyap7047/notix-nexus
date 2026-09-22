import sys
from pathlib import Path

# Add packages/bot-python to sys.path so web.py can be imported
bot_python_path = Path(__file__).parent.parent / "packages" / "bot-python"
if str(bot_python_path) not in sys.path:
    sys.path.insert(0, str(bot_python_path))

try:
    from web import app
except Exception:
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse

    app = FastAPI(title="NOTIX NEXUS API")

    @app.get("/")
    async def root():
        return JSONResponse({
            "name": "NOTIX NEXUS",
            "status": "online",
            "version": "2.0.0",
        })
