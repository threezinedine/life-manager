import mysql, {
	type Pool,
	type PoolOptions,
	type RowDataPacket,
	type Connection,
} from 'mysql2/promise';

export interface User {
	id: string;
	email: string;
	name: string;
	token: string | null;
	created_at: Date;
	updated_at: Date;
}

interface UserRow extends RowDataPacket, User {}

let pool: Pool;

export function getDbConfig(): PoolOptions {
	return {
		host: process.env.DB_HOST ?? 'localhost',
		port: Number(process.env.DB_PORT ?? 3306),
		user: process.env.DB_USER ?? 'root',
		password: process.env.DB_PASSWORD ?? '',
		database: process.env.DB_NAME ?? 'life_manager',
	};
}

function getPool(): Pool {
	if (!pool) {
		pool = mysql.createPool(getDbConfig());
	}
	return pool;
}

/** Returns the shared pool for use by repositories. */
export function getDb(): Pool {
	return getPool();
}

/** Only used by the migration runner — imports before DB exists. */
export async function getRawConnection(): Promise<Connection> {
	const conn = await mysql.createConnection(getDbConfig());
	return conn;
}

// ---------------------------------------------------------------------------
// User repository
// ---------------------------------------------------------------------------

export async function createUser(email: string, name: string): Promise<User> {
	const { v4: uuidv4 } = await import('uuid');
	const p = getPool();
	const id = uuidv4();
	await p.execute('INSERT INTO users (id, email, name) VALUES (?, ?, ?)', [
		id,
		email,
		name,
	]);
	const [rows] = await p.execute<UserRow[]>(
		'SELECT * FROM users WHERE id = ?',
		[id]
	);
	return rows[0];
}

export async function findUserByEmail(email: string): Promise<User | null> {
	const p = getPool();
	const [rows] = await p.execute<UserRow[]>(
		'SELECT * FROM users WHERE email = ?',
		[email]
	);
	return rows[0] ?? null;
}

export async function findUserByToken(token: string): Promise<User | null> {
	const p = getPool();
	const [rows] = await p.execute<UserRow[]>(
		'SELECT * FROM users WHERE token = ?',
		[token]
	);
	return rows[0] ?? null;
}

export async function setUserToken(
	userId: string,
	token: string | null
): Promise<void> {
	const p = getPool();
	await p.execute('UPDATE users SET token = ? WHERE id = ?', [token, userId]);
}

export async function closeDb(): Promise<void> {
	if (pool) {
		await pool.end();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		pool = undefined as unknown as Pool;
	}
}
