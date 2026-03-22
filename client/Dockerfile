FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

ENV PORT=5173
EXPOSE $PORT

CMD npm run dev -- --host 0.0.0.0 --port $PORT
