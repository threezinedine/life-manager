/// <reference types="vitest/globals" />
import { v4 as uuidv4 } from 'uuid';
import { describe, it, expect, beforeEach, afterEach, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import {
	createTestUser,
	deleteTestUser,
	testPool,
	type TestUser,
} from '../../test-setup';
import { registerRoutes } from './index';

describe('auth routes', () => {
	let app: express.Express;
	let user: TestUser;

	beforeEach(async () => {
		app = express();
		app.use(express.json());
		registerRoutes(app);
		user = await createTestUser();
	});

	afterEach(async () => {
		await deleteTestUser(user.id);
	});

	afterAll(async () => {
		await testPool.end();
	});

	// -------------------------------------------------------------------------
	// POST /api/auth/register
	// -------------------------------------------------------------------------

	describe('POST /api/auth/register', () => {
		it('returns 201 and the user with a token on success', async () => {
			const email = `brandnew-${uuidv4()}@example.com`;
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email, name: 'Brand New' });

			expect(res.status).toBe(201);
			expect(res.body.user.email).toBe(email);
			expect(res.body.user.name).toBe('Brand New');
			expect(typeof res.body.user.token).toBe('string');

			await deleteTestUser(res.body.user.id);
		});

		it('returns 409 when the email is already registered', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email: user.email, name: 'Dup Name' });

			expect(res.status).toBe(409);
			expect(res.body.error).toBe('Email already registered');
		});

		it('returns 409 when registering with same email different casing', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email: user.email.toUpperCase(), name: 'Casing Test' });

			expect(res.status).toBe(409);
			expect(res.body.error).toBe('Email already registered');
		});

		it('returns 400 when email is missing', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ name: 'No Email' });

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('returns 400 when email is not a valid email', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email: 'not-an-email', name: 'Bad Email' });

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('returns 400 when name is missing', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email: `valid-${uuidv4()}@example.com` });

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('returns 400 when name is an empty string', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email: `valid-${uuidv4()}@example.com`, name: '' });

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('returns 400 when name contains only whitespace', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email: `valid-${uuidv4()}@example.com`, name: '   ' });

			expect(res.status).toBe(400);
			expect(res.body).toHaveProperty('error');
		});

		it('accepts a name with spaces', async () => {
			const email = `spacename-${uuidv4()}@example.com`;
			const res = await request(app)
				.post('/api/auth/register')
				.send({ email, name: 'John Doe' });

			expect(res.status).toBe(201);
			expect(res.body.user.name).toBe('John Doe');

			await deleteTestUser(res.body.user.id);
		});
	});

	// -------------------------------------------------------------------------
	// POST /api/auth/login
	// -------------------------------------------------------------------------

	describe('POST /api/auth/login', () => {
		it('returns 200 and the user when the token is valid', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ token: user.token });

			expect(res.status).toBe(200);
			expect(res.body.user.id).toBe(user.id);
			expect(res.body.user.email).toBe(user.email);
			expect(res.body.user.name).toBe(user.name);
		});

		it('returns 401 when the token is not found', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ token: '550e8400-e29b-41d4-a716-446655440099' });

			expect(res.status).toBe(401);
			expect(res.body).toEqual({ error: 'Invalid token' });
		});

		it('returns 400 when token is not a valid UUID', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.send({ token: 'not-a-uuid-at-all' });

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('Invalid token format');
		});

		it('returns 401 when the token has been cleared from the database', async () => {
			await testPool.execute(
				'UPDATE users SET token = NULL WHERE id = ?',
				[user.id]
			);

			const res = await request(app)
				.post('/api/auth/login')
				.send({ token: user.token });

			expect(res.status).toBe(401);
			expect(res.body).toEqual({ error: 'Invalid token' });
		});
	});

	// -------------------------------------------------------------------------
	// POST /api/auth/refresh
	// -------------------------------------------------------------------------

	describe('POST /api/auth/refresh', () => {
		it('returns 200 and a new token when the old token is valid', async () => {
			const res = await request(app)
				.post('/api/auth/refresh')
				.send({ email: user.email, oldToken: user.token });

			expect(res.status).toBe(200);
			expect(typeof res.body.token).toBe('string');
			expect(res.body.token).not.toBe(user.token);
		});

		it('the new token can be used to login', async () => {
			const refreshRes = await request(app)
				.post('/api/auth/refresh')
				.send({ email: user.email, oldToken: user.token });

			const loginRes = await request(app)
				.post('/api/auth/login')
				.send({ token: refreshRes.body.token });

			expect(loginRes.status).toBe(200);
			expect(loginRes.body.user.id).toBe(user.id);
		});

		it('the old token no longer works after refresh', async () => {
			await request(app)
				.post('/api/auth/refresh')
				.send({ email: user.email, oldToken: user.token });

			const res = await request(app)
				.post('/api/auth/login')
				.send({ token: user.token });

			expect(res.status).toBe(401);
		});

		it('returns 401 when the token is not found', async () => {
			const res = await request(app).post('/api/auth/refresh').send({
				email: 'notfound@example.com',
				oldToken: '00000000-0000-0000-0000-000000000000',
			});

			expect(res.status).toBe(401);
			expect(res.body).toEqual({ error: 'Invalid token' });
		});

		it('returns 400 when token is not a valid UUID', async () => {
			const res = await request(app)
				.post('/api/auth/refresh')
				.send({ email: user.email, oldToken: 'not-a-uuid' });

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('Invalid token format');
		});
	});

	// -------------------------------------------------------------------------
	// GET /api/auth/me
	// -------------------------------------------------------------------------

	describe('GET /api/auth/me', () => {
		it('returns 200 and the user when the token is valid', async () => {
			const res = await request(app)
				.get('/api/auth/me')
				.set('Authorization', `Bearer ${user.token}`);

			expect(res.status).toBe(200);
			expect(res.body.user.id).toBe(user.id);
			expect(res.body.user.email).toBe(user.email);
			expect(res.body.user.name).toBe(user.name);
		});

		it('returns 401 when no Authorization header is provided', async () => {
			const res = await request(app).get('/api/auth/me');

			expect(res.status).toBe(401);
			expect(res.body).toEqual({ error: 'Invalid token' });
		});

		it('returns 401 when the token is invalid', async () => {
			const res = await request(app)
				.get('/api/auth/me')
				.set('Authorization', 'Bearer 550e8400-e29b-41d4-a716-446655440099');

			expect(res.status).toBe(401);
			expect(res.body).toEqual({ error: 'Invalid token' });
		});

		it('returns 401 when the token has been cleared', async () => {
			await testPool.execute(
				'UPDATE users SET token = NULL WHERE id = ?',
				[user.id]
			);

			const res = await request(app)
				.get('/api/auth/me')
				.set('Authorization', `Bearer ${user.token}`);

			expect(res.status).toBe(401);
			expect(res.body).toEqual({ error: 'Invalid token' });
		});
	});

	// -------------------------------------------------------------------------
	// i18n — Vietnamese
	// -------------------------------------------------------------------------

	describe('i18n — Vietnamese', () => {
		it('returns Vietnamese error when Accept-Language is vi on duplicate email', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.set('Accept-Language', 'vi')
				.send({ email: user.email, name: 'Dup Name' });

			expect(res.status).toBe(409);
			expect(res.body.error).toBe('Email đã được đăng ký');
		});

		it('returns Vietnamese error when Accept-Language is vi on invalid token', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.set('Accept-Language', 'vi')
				.send({ token: '550e8400-e29b-41d4-a716-446655440099' });

			expect(res.status).toBe(401);
			expect(res.body.error).toBe('Token không hợp lệ');
		});

		it('returns Vietnamese validation error for invalid email', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.set('Accept-Language', 'vi')
				.send({ email: 'not-an-email', name: 'Test' });

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('Địa chỉ email không hợp lệ');
		});

		it('returns Vietnamese validation error for missing name', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.set('Accept-Language', 'vi')
				.send({ email: `vi-${uuidv4()}@example.com`, name: '' });

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('Tên không được để trống');
		});

		it('returns Vietnamese validation error for invalid token format', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.set('Accept-Language', 'vi')
				.send({ token: 'not-a-uuid' });

			expect(res.status).toBe(400);
			expect(res.body.error).toBe('Định dạng token không hợp lệ');
		});

		it('falls back to English when locale is unsupported', async () => {
			const res = await request(app)
				.post('/api/auth/login')
				.set('Accept-Language', 'fr')
				.send({ token: '550e8400-e29b-41d4-a716-446655440099' });

			expect(res.status).toBe(401);
			expect(res.body.error).toBe('Invalid token');
		});

		it('prefers Vietnamese when it has higher quality than English', async () => {
			const res = await request(app)
				.post('/api/auth/register')
				.set('Accept-Language', 'en;q=0.9, vi;q=1')
				.send({ email: user.email, name: 'Dup Name' });

			expect(res.status).toBe(409);
			expect(res.body.error).toBe('Email đã được đăng ký');
		});
	});
});
