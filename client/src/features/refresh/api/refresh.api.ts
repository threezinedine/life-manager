import { internalFetch } from '@/utils';
import type { RefreshCredentials, RefreshResponse } from '../types/refresh.types';

export async function refreshApi(
	credentials: RefreshCredentials
): Promise<RefreshResponse> {
	const response = await internalFetch('auth/refresh', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error(
			(body as { error?: string }).error ?? 'Token refresh failed'
		);
	}

	return response.json() as Promise<RefreshResponse>;
}
