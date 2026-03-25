FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=dev

COPY . .

ENV PORT=4991
EXPOSE $PORT

CMD ["npx", "tsx", "index.ts"]
