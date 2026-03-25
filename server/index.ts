import express, { Request, Response } from 'express';
import cors from 'cors';
import { runMigrations } from './migrate';
import { registerRoutes as registerAuthRoutes } from './features/authentication';

const app = express();

// Middleware
app.use(express.json());

// CORS — only in development
if (process.env.ENVIRONMENT === 'development') {
	app.use(
		cors({
			origin: `http://localhost:${process.env.CLIENT_PORT || '1994'}`,
			credentials: true,
		})
	);
}

// Health check
app.get('/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok' });
});

// Feature routes
registerAuthRoutes(app);

const HOST = process.env.VITE_SERVER_HOST || 'localhost';
const PORT = process.env.PORT || process.env.VITE_SERVER_PORT || 3000;

// Run migrations then start server
app.listen(PORT, () => {
	console.log(`Server running on http://${HOST}:${PORT}`);
});
