# Life Manager

> ⚠️ **Replace `{owner}/{repo}`** in the badges below with your actual GitHub repository path (e.g. `threezinedine/life-manager`).

[![Client Tests](https://img.shields.io/github/actions/workflow/status/{owner}/{repo}/client-tests.yml?label=client+tests&logo=github)](https://github.com/{owner}/{repo}/actions)
[![TypeScript](https://img.shields.io/badge/typescript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/react-19-61dafb?logo=react)](https://react.dev/)
[![Expo SDK 54](https://img.shields.io/badge/expo-54-000?logo=expo)](https://expo.dev/)

A comprehensive full-stack application for managing daily life — built as three independent services: a **React web client**, a **Node.js/Express API server**, and a **React Native (Expo) mobile app**.

## Architecture

```bash
┌─────────────┐
│   Mobile    │  React Native + Expo
│  (client-   │  Port: 8081
│   mobile)   │
└──────┬──────┘
       │ REST API
       ▼
┌─────────────┐      ┌─────────────┐
│   Server    │      │    Nginx    │
│  (Express)  │      │  Reverse    │
│  Port: 3000 │      │   Proxy     │
└─────────────┘      │   Port: 80  │
                     └─────────────┘
       ▲
       │ REST API
┌──────┴──────┐
│   Client    │
│  (React +   │
│   Vite)     │  Port: 5173
└─────────────┘
```

All three services run in Docker via `docker-compose`.

## Tech Stack

| Service | Framework | Language | Port |
| --- | --- | --- | --- |
| **Server** | Express 5 | TypeScript | `3000` |
| **Client** | React 19 + Vite 8 | TypeScript | `5173` |
| **Mobile** | Expo SDK 54 + React Native 0.81 | TypeScript | `8081` |
| **Reverse Proxy** | Nginx | — | `80` |

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for full stack)
- Expo CLI (`npx expo`) for mobile dev

### Development

```bash
# All services (dev mode with hot reload via tsx)
npm run dev           # Start server only
npm run client        # Start web client only
npm run server        # Start API server only

# Full stack with Docker
npm run docker:up     # Start all services via docker-compose
npm run docker:down   # Stop all services
```

### Production

```bash
# Build & start all services
docker-compose up -d --build
```

## Project Structure

```bash
life-manager/
├── client/              # React web app (Vite)
│   ├── src/
│   │   ├── components/  # UI components (Button, ...)
│   │   ├── data/        # Shared enums & types
│   │   ├── layouts/     # Layout wrappers
│   │   └── pages/       # Route pages
│   ├── .storybook/      # Storybook config
│   ├── vitest.config.ts # Vitest config
│   └── .prettierrc      # Prettier config
│
├── server/              # Express API server
│   ├── index.ts         # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── client-mobile/       # React Native app (Expo)
│   ├── app/            # File-based routing (_layout, tabs, ...)
│   ├── components/     # Reusable UI components
│   ├── constants/      # App constants
│   ├── hooks/          # Custom hooks
│   ├── Dockerfile
│   └── package.json
│
├── nginx/              # Nginx reverse proxy config
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml  # Orchestrates all 4 services
└── .github/
    └── workflows/      # CI/CD pipelines
        └── client-tests.yml
```

## Test Results

### Client (Web)

| Metric | Result |
| --- | --- |
| Test Files | 1 passed |
| Tests | 5 passed |
| Duration | ~1s |
| Coverage | **100%** across all files |

```bash
components/button/button.tsx  100% stmts · 100% branch · 100% funcs · 100% lines
data/props.ts                 100% stmts · 100% branch · 100% funcs · 100% lines
─────────────────────────────────────────────────────────────────────────────
Overall                       100% stmts · 100% branch · 100% funcs · 100% lines
```

### Run tests locally

```bash
# Web client
cd client && npm run test -- --run

# With coverage
cd client && npm run test:coverage -- --run
```

## GitHub Actions

| Workflow | Trigger | Jobs |
| --- | --- | --- |
| `client-tests.yml` | Push + PR | `test`, `format`, `build`, `storybook` |

## Environment Variables

Create a `.prod.env` file at the project root:

```env
SERVER_PORT=3000
CLIENT_PORT=5173
CLIENT_MOBILE_PORT=8081
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start server in dev mode |
| `npm run client` | Start web client dev server |
| `npm run server` | Start API server dev mode |
| `npm run docker:up` | Start all services with Docker |
| `npm run docker:down` | Stop all Docker services |

## License

ISC
