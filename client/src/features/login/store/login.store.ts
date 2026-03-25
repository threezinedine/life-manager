import { create } from 'zustand';
import type { LoginState } from '../types/login.types';

interface LoginStore extends LoginState {
	login: (email: string, password: string) => Promise<void>;
	clearError: () => void;
	reset: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
	isLoading: false,
	error: null,

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			// TODO: wire up actual API call
			// import { loginApi } from '../api/login.api';
			// await loginApi({ email, password });
			console.log('Login with:', { email, password });
		} catch (err) {
			set({ error: (err as Error).message });
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
	reset: () => set({ isLoading: false, error: null }),
}));
