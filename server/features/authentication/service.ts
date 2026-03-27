import { v4 as uuidv4 } from 'uuid';
import * as db from '../../db/db';

export const AuthErrorCode = {
	EMAIL_ALREADY_REGISTERED: 'EMAIL_ALREADY_REGISTERED',
	INVALID_TOKEN: 'INVALID_TOKEN',
} as const;

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export interface RegisterResult {
	ok: true;
	user: { id: string; email: string; name: string; token: string };
}

export interface LoginResult {
	ok: true;
	user: { id: string; email: string; name: string };
}

export interface RefreshResult {
	ok: true;
	token: string;
}

export type ErrorResult = { ok: false; error: string; code: AuthErrorCode };

export async function register(
	email: string,
	name: string
): Promise<RegisterResult | ErrorResult> {
	const existing = await db.findUserByEmail(email);
	if (existing) {
		return {
			ok: false,
			error: 'Email already registered',
			code: AuthErrorCode.EMAIL_ALREADY_REGISTERED,
		};
	}

	const user = await db.createUser(email, name);
	const token = uuidv4();
	await db.setUserToken(user.id, token);

	return {
		ok: true,
		user: { id: user.id, email: user.email, name: user.name, token },
	};
}

export async function login(token: string): Promise<LoginResult | ErrorResult> {
	const user = await db.findUserByToken(token);
	if (!user) {
		return {
			ok: false,
			error: 'Invalid token',
			code: AuthErrorCode.INVALID_TOKEN,
		};
	}

	return {
		ok: true,
		user: { id: user.id, email: user.email, name: user.name },
	};
}

export async function refresh(
	email: string
): Promise<RefreshResult | ErrorResult> {
	const user = await db.findUserByEmail(email);
	if (!user) {
		return {
			ok: false,
			error: 'Invalid token',
			code: AuthErrorCode.INVALID_TOKEN,
		};
	}

	const newToken = uuidv4();
	await db.setUserToken(user.id, newToken);

	return { ok: true, token: newToken };
}
