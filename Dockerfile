FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --workspace=packages/dashboard

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=packages/dashboard"]
