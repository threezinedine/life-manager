import { create } from 'zustand';
import type { LoginState } from '../types/login.types';
import { useToastStore } from '@/components/toast';
import { useAuthTokenStore } from '@/stores/auth-token.store';
import { loginApi } from '../api/login.api';
import { meApi } from '@/features/auth/api/me.api';

interface LoginStore extends LoginState {
	login: (token: string) => Promise<boolean>;
	reset: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
	isLoading: false,

	login: async (token: string) => {
		let result = false;
		set({ isLoading: true });
		try {
			// Validate token against the server
			await loginApi({ token });

			// Fetch user info
			const user = await meApi(token);

			// Both succeeded — store token and user info
			useAuthTokenStore.getState().setToken(token);
			useAuthTokenStore.getState().setUser(user);
			useToastStore
				.getState()
				.success('Login successful!', undefined, 'login-success-toast');
			result = true;
		} catch (err) {
			const message = (err as Error).message;
			useToastStore
				.getState()
				.error(message, undefined, 'login-error-toast');
			result = false;
		} finally {
			set({ isLoading: false });
			return result;
		}
	},

	reset: () => set({ isLoading: false }),
}));
