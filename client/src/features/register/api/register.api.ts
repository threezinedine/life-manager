import type {
	RegisterCredentials,
	RegisterResponse,
} from '../types/register.types';
import { internalFetch } from '@/utils';

export async function registerApi(
	credentials: RegisterCredentials
): Promise<RegisterResponse> {
	const response = await internalFetch('auth/register', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error(
			(body as { error?: string }).error ?? 'Registration failed'
		);
	}

	return response.json() as Promise<RegisterResponse>;
}
