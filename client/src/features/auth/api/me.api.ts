import { internalFetch } from '@/utils';
import { AuthUser } from '@/stores/auth-token.store';

interface MeResponse {
	user: AuthUser;
}

export async function meApi(token: string): Promise<AuthUser> {
	const response = await internalFetch('auth/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const body = await response.json().catch(() => ({}));
		throw new Error((body as { error?: string }).error ?? 'Failed to fetch user info');
	}

	const data = (await response.json()) as MeResponse;
	return data.user;
}
