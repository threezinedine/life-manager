/**
 * Auth store — persists the token and user info to localStorage.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const STORAGE_KEY = 'auth-token';

export interface AuthUser {
	id: string;
	email: string;
	name: string;
}

interface AuthTokenState {
	/** The raw bearer token, or null if not authenticated. */
	token: string | null;
	/** The authenticated user's info, or null if not fetched / not authenticated. */
	user: AuthUser | null;
	setToken: (token: string | null) => void;
	setUser: (user: AuthUser | null) => void;
	/** Clears token and user — call this on logout. */
	clearAuth: () => void;
}

export const useAuthTokenStore = create<AuthTokenState>()(
	persist(
		(set) => ({
			token: null,
			user: null,

			setToken: (token) => set({ token }),

			setUser: (user) => set({ user }),

			clearAuth: () => set({ token: null, user: null }),
		}),
		{
			name: STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
