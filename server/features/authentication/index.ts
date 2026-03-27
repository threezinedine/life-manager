import type { Express } from 'express';
import { z } from 'zod';
import * as auth from './service';
import { detectLocale, t, type Locale } from '../../i18n';

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

/** Translate a service error using the detected locale. Falls back to English. */
function translateError(code: auth.AuthErrorCode, locale: Locale): string {
	switch (code) {
		case auth.AuthErrorCode.EMAIL_ALREADY_REGISTERED:
			return t('auth.emailAlreadyRegistered', locale);
		case auth.AuthErrorCode.INVALID_TOKEN:
			return t('auth.invalidToken', locale);
		default:
			return t('validation.invalidRequest', locale);
	}
}

/** Translate a Zod validation error. */
function translateValidationError(raw: string, locale: Locale): string {
	switch (raw) {
		case 'Invalid email address':
			return t('validation.invalidEmail', locale);
		case 'Name is required':
			return t('validation.nameRequired', locale);
		case 'Invalid token format':
			return t('validation.invalidTokenFormat', locale);
		default:
			return t('validation.invalidRequest', locale);
	}
}

export function registerRoutes(app: Express): void {
	// POST /auth/register — create a new account, returns user + token
	app.post('/api/auth/register', async (req, res) => {
		const locale = detectLocale(req.headers['accept-language']);
		const parsed = RegisterSchema.safeParse(req.body);
		if (!parsed.success) {
			const raw = parsed.error.errors[0]?.message ?? 'Invalid request';
			res.status(400).json({
				error: translateValidationError(raw, locale),
			});
			return;
		}

		const result = await auth.register(parsed.data.email, parsed.data.name);
		if (!result.ok) {
			res.status(409).json({ error: translateError(result.code, locale) });
			return;
		}

		res.status(201).json({ user: result.user });
	});

	// POST /auth/login — authenticate with a token, returns user
	app.post('/api/auth/login', async (req, res) => {
		const locale = detectLocale(req.headers['accept-language']);
		const parsed = TokenSchema.safeParse(req.body);
		if (!parsed.success) {
			const raw = parsed.error.errors[0]?.message ?? 'Invalid request';
			res.status(400).json({
				error: translateValidationError(raw, locale),
			});
			return;
		}

		const result = await auth.login(parsed.data.token);
		if (!result.ok) {
			res.status(401).json({ error: translateError(result.code, locale) });
			return;
		}

		res.json({ user: result.user });
	});

	// POST /auth/refresh — invalidate old token and issue a new one
	app.post('/api/auth/refresh', async (req, res) => {
		const locale = detectLocale(req.headers['accept-language']);
		const parsed = RefreshSchema.safeParse(req.body);
		if (!parsed.success) {
			const raw = parsed.error.errors[0]?.message ?? 'Invalid request';
			res.status(400).json({
				error: translateValidationError(raw, locale),
			});
			return;
		}

		// Optional: you could also check if the old token is valid before issuing a new one
		const loginResult = await auth.login(parsed.data.oldToken);
		if (!loginResult.ok) {
			res.status(401).json({ error: translateError(loginResult.code, locale) });
			return;
		}

		const result = await auth.refresh(parsed.data.email);
		if (!result.ok) {
			res.status(401).json({ error: translateError(result.code, locale) });
			return;
		}

		res.json({ token: result.token });
	});
}
