import os
import asyncio
import logging

import psutil
import disnake
from fastapi import FastAPI
from fastapi.responses import JSONResponse

logger = logging.getLogger("NexusWeb")

app = FastAPI(title="NOTIX NEXUS API")


@app.get("/")
async def root():
    return JSONResponse({
        "name": "NOTIX NEXUS",
        "status": "online",
        "version": "2.0.0",
        "description": "Discord Intelligence Platform",
    })


@app.get("/health")
async def health():
    return JSONResponse({
        "status": "healthy",
        "cpu": psutil.cpu_percent(),
        "memory": psutil.virtual_memory().percent,
    })


@app.get("/api/stats")
async def stats():
    from main import bot
    guilds = len(bot.guilds) if bot.is_ready() else 0
    users = sum(g.member_count or 0 for g in bot.guilds) if bot.is_ready() else 0
    return JSONResponse({
        "guilds": guilds,
        "users": users,
        "commands": len(bot.slash_commands),
        "latency": round(bot.latency * 1000) if bot.is_ready() else 0,
    })
