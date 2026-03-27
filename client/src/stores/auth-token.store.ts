/**
 * Auth token store — persists the authentication token to localStorage.
 *
 * The server returns the raw token in the API response body.
 * The client stores it here and attaches it as `Authorization: Bearer <token>`
 * to every subsequent request via `internalFetch`.
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
		}
	)
);
