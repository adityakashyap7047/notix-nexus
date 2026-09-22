FROM node:20-slim

RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY packages/dashboard/package.json packages/dashboard/package-lock.json ./packages/dashboard/
RUN cd packages/dashboard && npm install

COPY packages/bot-python/requirements.txt ./packages/bot-python/
RUN pip3 install --break-system-packages -r packages/bot-python/requirements.txt

COPY . .

RUN npm run build --workspace=packages/dashboard

RUN chmod +x start.sh

EXPOSE 3000

CMD ["./start.sh"]
