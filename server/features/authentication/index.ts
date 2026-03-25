import type { Express } from 'express';
import { z } from 'zod';
import * as auth from './service';

const RegisterSchema = z.object({
	email: z.string().email('Invalid email address'),
	name: z.string().trim().min(1, 'Name is required').max(255),
});

const TokenSchema = z.object({
	token: z.string().uuid('Invalid token format'),
});

const RefreshSchema = z.object({
	email: z.string().email('Invalid email address'),
	oldToken: z.string().uuid('Invalid token format'),
});

export function registerRoutes(app: Express): void {
	// POST /auth/register — create a new account, returns user + token
	app.post('/api/auth/register', async (req, res) => {
		const parsed = RegisterSchema.safeParse(req.body);
		if (!parsed.success) {
			res.status(400).json({
				error: parsed.error.errors[0]?.message ?? 'Invalid request',
			});
			return;
		}

		const result = await auth.register(parsed.data.email, parsed.data.name);
		if (!result.ok) {
			res.status(409).json({ error: result.error });
			return;
		}

		res.status(201).json({ user: result.user });
	});

	// POST /auth/login — authenticate with a token, returns user
	app.post('/api/auth/login', async (req, res) => {
		const parsed = TokenSchema.safeParse(req.body);
		if (!parsed.success) {
			res.status(400).json({
				error: parsed.error.errors[0]?.message ?? 'Invalid request',
			});
			return;
		}

		const result = await auth.login(parsed.data.token);
		if (!result.ok) {
			res.status(401).json({ error: result.error });
			return;
		}

		res.json({ user: result.user });
	});

	// POST /auth/refresh — invalidate old token and issue a new one
	app.post('/api/auth/refresh', async (req, res) => {
		const parsed = RefreshSchema.safeParse(req.body);
		if (!parsed.success) {
			res.status(400).json({
				error: parsed.error.errors[0]?.message ?? 'Invalid request',
			});
			return;
		}

		// Optional: you could also check if the old token is valid before issuing a new one
		const loginResult = await auth.login(parsed.data.oldToken);
		if (!loginResult.ok) {
			res.status(401).json({ error: 'Invalid token' });
			return;
		}

		const result = await auth.refresh(parsed.data.email);
		if (!result.ok) {
			res.status(401).json({ error: result.error });
			return;
		}

		res.json({ token: result.token });
	});
}
