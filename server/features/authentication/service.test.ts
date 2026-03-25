/// <reference types="vitest/globals" />
import { v4 as uuidv4 } from 'uuid';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
	createTestUser,
	deleteTestUser,
	type TestUser,
} from '../../test-setup';
import * as auth from './service';
import * as db from '../../db/db';

describe('auth service', () => {
	let user: TestUser;

	beforeEach(async () => {
		user = await createTestUser();
	});

	afterEach(async () => {
		await deleteTestUser(user.id);
	});

	// -------------------------------------------------------------------------
	// register
	// -------------------------------------------------------------------------

	describe('register', () => {
		it('creates a user and returns it with a token', async () => {
			const email = `new-${uuidv4()}@example.com`;
			const result = await auth.register(email, 'New User');

			try {
				expect(result.ok).toBe(true);
				if (result.ok) {
					expect(result.user.email).toBe(email);
					expect(result.user.name).toBe('New User');
					expect(typeof result.user.token).toBe('string');
				}
			} finally {
				if (result.ok) await deleteTestUser(result.user.id);
			}
		});

		it('stores the token in the database', async () => {
			const email = `tokentest-${uuidv4()}@example.com`;
			const result = await auth.register(email, 'Token Test');

			try {
				expect(result.ok).toBe(true);
				if (result.ok) {
					const stored = await db.findUserByEmail(email);
					expect(stored?.token).toBe(result.user.token);
				}
			} finally {
				if (result.ok) await deleteTestUser(result.user.id);
			}
		});

		it('returns an error when the email is already taken', async () => {
			const result = await auth.register(user.email, 'Someone Else');
			expect(result).toEqual({
				ok: false,
				error: 'Email already registered',
			});
		});

		it('returns an error when registering with the same email in different casing', async () => {
			const result = await auth.register(
				user.email.toUpperCase(),
				'Casing Test'
			);
			expect(result).toEqual({
				ok: false,
				error: 'Email already registered',
			});
		});
	});

	// -------------------------------------------------------------------------
	// login
	// -------------------------------------------------------------------------

	describe('login', () => {
		it('returns the user when the token is valid', async () => {
			const result = await auth.login(user.token);

			expect(result).toEqual({
				ok: true,
				user: { id: user.id, email: user.email, name: user.name },
			});
		});

		it('returns an error when the token is not found', async () => {
			const result = await auth.login(
				'550e8400-e29b-41d4-a716-446655440099'
			);
			expect(result).toEqual({ ok: false, error: 'Invalid token' });
		});

		it('returns an error when the token is an empty string', async () => {
			const result = await auth.login('');
			expect(result).toEqual({ ok: false, error: 'Invalid token' });
		});

		it('returns an error when the token has been cleared from the database', async () => {
			await db.setUserToken(user.id, null);
			const result = await auth.login(user.token);
			expect(result).toEqual({ ok: false, error: 'Invalid token' });
		});
	});

	// -------------------------------------------------------------------------
	// refresh
	// -------------------------------------------------------------------------

	describe('refresh', () => {
		it('issues a new token and invalidates the old one', async () => {
			const oldToken = user.token;
			const result = await auth.refresh(oldToken);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.token).not.toBe(oldToken);

				const loginOld = await auth.login(oldToken);
				expect(loginOld).toEqual({ ok: false, error: 'Invalid token' });

				const loginNew = await auth.login(result.token);
				expect(loginNew.ok).toBe(true);
			}
		});

		it('returns an error when the token is not found', async () => {
			const result = await auth.refresh(
				'550e8400-e29b-41d4-a716-446655440099'
			);
			expect(result).toEqual({ ok: false, error: 'Invalid token' });
		});

		it('stores only one token per user (replaces the old one)', async () => {
			const result = await auth.refresh(user.token);
			expect(result.ok).toBe(true);
			if (result.ok) {
				const stored = await db.findUserByEmail(user.email);
				expect(stored?.token).toBe(result.token);
			}
		});
	});
});
