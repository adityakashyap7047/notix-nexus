#!/bin/bash
cd /app/packages/dashboard
npm start &
cd /app/packages/bot-python
python main.py
