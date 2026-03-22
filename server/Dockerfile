FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

ENV PORT=4991
EXPOSE $PORT

CMD ["node", "index.js"]
