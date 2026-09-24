FROM node:20-slim

# Install Python 3, pip, and required system tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    sed \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root and workspace package files for optimal Docker layer caching
COPY package.json package-lock.json ./
COPY packages/bot/package.json ./packages/bot/
COPY packages/dashboard/package.json ./packages/dashboard/
COPY packages/shared/package.json ./packages/shared/
COPY packages/bot-python/dashboard/package.json ./packages/bot-python/dashboard/

# Install Node dependencies
RUN npm install
RUN cd packages/bot-python/dashboard && npm install

# Copy Python requirements and install dependencies
COPY packages/bot-python/requirements.txt ./packages/bot-python/
RUN pip3 install --no-cache-dir --break-system-packages -r packages/bot-python/requirements.txt

# Copy all application source code
COPY . .

# Build Next.js dashboard
RUN npm run build --workspace=packages/dashboard

# Fix CRLF line endings if copied from Windows and make startup script executable
RUN sed -i 's/\r$//' start.sh && chmod +x start.sh

# Web dashboard exposed on port 3000
EXPOSE 3000

CMD ["./start.sh"]
