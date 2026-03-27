import type { LoginCredentials, LoginResponse } from '../types/login.types';
import { internalFetch } from '@/utils';

export async function loginApi(
	credentials: LoginCredentials
): Promise<LoginResponse> {
	const response = await internalFetch('auth/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error(
			(body as { error?: string }).error ?? 'Login failed'
		);
	}

	return response.json() as Promise<LoginResponse>;
}
