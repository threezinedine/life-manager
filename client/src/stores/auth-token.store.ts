/**
 * Auth token store — persists the authentication token to localStorage.
 *
 * In development (ENVIRONMENT !== 'production'):
 *   The server returns the raw token in the API response body.
 *   The client stores it here and attaches it as `Authorization: Bearer <token>`
 *   to every subsequent request via `internalFetch`.
 *
 * In production:
 *   The server uses express-session (cookie-based). The token is never
 *   stored client-side — the signed session cookie is sent automatically.
 *   This store is still available for logout / token inspection.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const STORAGE_KEY = 'auth-token';

interface AuthTokenState {
	/** The raw bearer token, or null if not authenticated. */
	token: string | null;
	setToken: (token: string | null) => void;
	/** Clears the token — call this on logout. */
	clearToken: () => void;
}

export const useAuthTokenStore = create<AuthTokenState>()(
	persist(
		(set) => ({
			token: null,

			setToken: (token) => set({ token }),

			clearToken: () => set({ token: null }),
		}),
		{
			name: STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			// Only persist in development; production uses session cookies
			// The ENVIRONMENT check is done at the *call site* in internalFetch,
			// but we also skip persisting in prod to be extra safe.
			partialize: (state) => {
				return import.meta.env.VITE_ENVIRONMENT !== 'production'
					? { token: state.token }
					: { token: null };
			},
		}
	)
);
