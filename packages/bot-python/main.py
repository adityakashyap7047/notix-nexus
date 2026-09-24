import os
import sys
import asyncio
import logging
import subprocess
from pathlib import Path

import disnake
from disnake.ext import commands
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("NexusBot")

TOKEN = os.getenv("TOKEN") or os.getenv("DISCORD_TOKEN", "")
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/notix-nexus")
BOT_OWNER_ID = int(os.getenv("BOT_OWNER_ID", "0"))

intents = disnake.Intents.default()
intents.message_content = True
intents.members = True
intents.guilds = True


class NexusBot(commands.Bot):
    def __init__(self):
        super().__init__(
            command_prefix="!",
            intents=intents,
            owner_id=BOT_OWNER_ID if BOT_OWNER_ID else None,
        )
        self.mongodb_uri = MONGODB_URI

    async def on_ready(self):
        await self.change_presence(
            activity=disnake.Activity(
                type=disnake.ActivityType.watching,
                name="NOTIX NEXUS | /help",
            )
        )
        guild_count = len(self.guilds)
        user_count = sum(g.member_count or 0 for g in self.guilds)
        logger.info("═" * 40)
        logger.info("  NEXUS ONLINE")
        logger.info(f"  Bot: {self.user} (ID: {self.user.id})")
        logger.info(f"  Guilds: {guild_count}")
        logger.info(f"  Users: {user_count}")
        logger.info("═" * 40)

    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.CommandNotFound):
            return
        logger.error(f"Command error: {error}")


bot = NexusBot()


import shutil
import threading

class NexusLoader:
    def __init__(self, bot_instance):
        self.bot = bot_instance
        self.cogs_path = Path(__file__).parent / "bot" / "cogs"

    def load_all(self):
        loaded = 0
        failed = 0
        if not self.cogs_path.exists():
            logger.warning(f"NexusLoader: Cogs directory not found at {self.cogs_path}")
            return
        for cog_file in sorted(self.cogs_path.glob("*.py")):
            if cog_file.name.startswith("_"):
                continue
            cog_name = f"bot.cogs.{cog_file.stem}"
            try:
                self.bot.load_extension(cog_name)
                logger.info(f"NexusLoader: Loaded cog: {cog_file.name}")
                loaded += 1
            except Exception as e:
                logger.error(f"NexusLoader: Failed to load {cog_file.name}: {e}")
                failed += 1
        logger.info(f"NexusLoader: {loaded} loaded, {failed} failed")


def start_api():
    try:
        import uvicorn
        import web

        def run_server():
            uvicorn.run(web.app, host="0.0.0.0", port=8000, log_level="warning")

        api_thread = threading.Thread(target=run_server, daemon=True)
        api_thread.start()
        logger.info("Nexus API server running on http://0.0.0.0:8000")
    except Exception as e:
        logger.error(f"Failed to start API: {e}")


def start_dashboard():
    # Only start dashboard if not handled by external process / script
    if os.getenv("START_DASHBOARD_IN_BOT", "0") != "1":
        return
    dashboard_dir = Path(__file__).parent / "dashboard"
    try:
        node_bin = shutil.which("node") or "node"
        subprocess.Popen(
            [node_bin, "server.js"],
            cwd=str(dashboard_dir),
        )
        logger.info("Dashboard server starting...")
    except Exception as e:
        logger.error(f"Failed to start dashboard: {e}")


if __name__ == "__main__":
    start_api()
    loader = NexusLoader(bot)
    loader.load_all()
    start_dashboard()

    if not TOKEN:
        logger.error("No bot token found! Set TOKEN or DISCORD_TOKEN env var.")
    else:
        bot.run(TOKEN)
