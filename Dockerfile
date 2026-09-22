FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/bot/package.json packages/bot/
COPY packages/shared/package.json packages/shared/

RUN npm install

COPY packages/bot/src packages/bot/src
COPY packages/bot/tsconfig.json packages/bot/
COPY packages/shared/src packages/shared/src
COPY packages/shared/tsconfig.json packages/shared/

RUN cd packages/bot && npx tsc

CMD ["node", "packages/bot/dist/main.js"]
