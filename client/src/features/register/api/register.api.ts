import type {
	RegisterCredentials,
	RegisterResponse,
} from '../types/register.types';
import { getServerUrl } from '@/utils';

export async function registerApi(
	credentials: RegisterCredentials
): Promise<RegisterResponse> {
	const response = await fetch(`${getServerUrl()}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error(
			(body as { message?: string }).message ?? 'Registration failed'
		);
	}

	return response.json() as Promise<RegisterResponse>;
}
