#!/bin/bash
cd /app/packages/bot-python/dashboard
node server.js &
cd /app/packages/bot-python
python3 main.py
