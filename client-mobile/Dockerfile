FROM node:20-alpine

WORKDIR /app

# Install Watchman for React Native
RUN apk add --no-cache watchman

COPY package*.json ./
RUN npm install

COPY . .

ENV EXPO_PUBLIC_API_URL=http://localhost:4991
ENV PORT=8081
EXPOSE 8081

CMD ["npx", "expo", "start", "--no-dev", "--non-interactive"]
