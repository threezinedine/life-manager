/**
 * Auth store — persists the token and user info to localStorage.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { meApi } from '@/features/auth/api/me.api';

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
	/** True while the token is being validated against the server. */
	isValidating: boolean;
	/** True when the stored token has been successfully validated. */
	isAuthenticated: boolean;
	setToken: (token: string | null) => void;
	setUser: (user: AuthUser | null) => void;
	setIsAuthenticated: (value: boolean) => void;
	/** Validates the stored token via GET /api/auth/me. Clears auth if invalid. */
	validate: () => Promise<boolean>;
	/** Clears token and user — call this on logout. */
	clearAuth: () => void;
}

export const useAuthTokenStore = create<AuthTokenState>()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isValidating: false,
			isAuthenticated: false,

			setToken: (token) => set({ token }),

			setUser: (user) => set({ user }),

			setIsAuthenticated: (value) => set({ isAuthenticated: value }),

			validate: async () => {
				const { token } = get();
				if (!token) {
					set({ isAuthenticated: false });
					return false;
				}
				set({ isValidating: true });
				try {
					const user = await meApi(token);
					set({ user, isAuthenticated: true });
					return true;
				} catch {
					set({ token: null, user: null, isAuthenticated: false });
					return false;
				} finally {
					set({ isValidating: false });
				}
			},

			clearAuth: () =>
				set({ token: null, user: null, isAuthenticated: false }),
		}),
		{
			name: STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				token: state.token,
				user: state.user,
			}),
		}
	)
);
