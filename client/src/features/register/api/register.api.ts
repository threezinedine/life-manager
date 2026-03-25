import type { RegisterCredentials, RegisterResponse } from '../types/register.types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export async function registerApi(
	credentials: RegisterCredentials
): Promise<RegisterResponse> {
	const response = await fetch(`${API_BASE}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error((body as { message?: string }).message ?? 'Registration failed');
	}

	return response.json() as Promise<RegisterResponse>;
}
