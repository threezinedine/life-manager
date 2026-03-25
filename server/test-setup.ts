import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import { getDbConfig } from './db/db';

// Load .env from project root so tests have the same DB credentials as dev
const envPath = path.resolve(process.cwd(), '../.env');
if (fs.existsSync(envPath)) {
	for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq === -1) continue;
		const key = trimmed.slice(0, eq).trim();
		const value = trimmed.slice(eq + 1).trim();
		if (key) process.env[key] = process.env[key] ?? value;
	}
}

export const testPool = mysql.createPool({
	...getDbConfig(),
	waitForConnections: true,
	connectionLimit: 10,
});

export interface TestUser {
	id: string;
	email: string;
	name: string;
	token: string;
}

/**
 * Creates a user in the DB. Call `deleteTestUser` in afterEach to clean up.
 * Email is always unique per call via UUID.
 */
export async function createTestUser(
	overrides: Partial<Pick<TestUser, 'email' | 'name' | 'token'>> = {}
): Promise<TestUser> {
	const id = uuidv4();
	const email = overrides.email ?? `test-${uuidv4()}@example.com`;
	const name = overrides.name ?? 'Test User';
	const token = overrides.token ?? uuidv4();

	await testPool.execute(
		'INSERT INTO users (id, email, name, token) VALUES (?, ?, ?, ?)',
		[id, email, name, token]
	);

	return { id, email, name, token };
}

/** Deletes a user by id. Safe to call even if the user was already cleaned up. */
export async function deleteTestUser(id: string): Promise<void> {
	await testPool.execute('DELETE FROM users WHERE id = ?', [id]);
}
