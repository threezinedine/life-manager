import express, { Request, Response } from 'express';
import { runMigrations } from './migrate';
import { registerRoutes as registerAuthRoutes } from './features/authentication';

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok' });
});

// Feature routes
registerAuthRoutes(app);

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// Run migrations then start server
runMigrations()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Failed to run migrations:', err);
		process.exit(1);
	});
