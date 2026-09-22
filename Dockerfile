FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --workspace=packages/bot

CMD ["npm", "run", "start", "--workspace=packages/bot"]
