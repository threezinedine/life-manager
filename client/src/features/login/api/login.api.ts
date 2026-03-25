import type { LoginCredentials, LoginResponse } from '../types/login.types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export async function loginApi(
	credentials: LoginCredentials
): Promise<LoginResponse> {
	const response = await fetch(`${API_BASE}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error((body as { message?: string }).message ?? 'Login failed');
	}

	return response.json() as Promise<LoginResponse>;
}
