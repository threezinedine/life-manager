import type { LoginCredentials, LoginResponse } from '../types/login.types';
import { getServerUrl } from '@/utils';

export async function loginApi(
	credentials: LoginCredentials
): Promise<LoginResponse> {
	const response = await fetch(`${getServerUrl()}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error(
			(body as { message?: string }).message ?? 'Login failed'
		);
	}

	return response.json() as Promise<LoginResponse>;
}
