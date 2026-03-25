import { create } from 'zustand';
import type { RegisterState } from '../types/register.types';

interface RegisterStore extends RegisterState {
	register: (
		username: string,
		email: string,
		password: string,
		confirmPassword: string
	) => Promise<void>;
	clearError: () => void;
	reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
	isLoading: false,
	error: null,

	register: async (username, email, password, confirmPassword) => {
		set({ isLoading: true, error: null });
		try {
			// TODO: wire up actual API call
			// import { registerApi } from '../api/register.api';
			// await registerApi({ username, email, password, confirmPassword });
			console.log('Register with:', { username, email, password, confirmPassword });
		} catch (err) {
			set({ error: (err as Error).message });
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
	reset: () => set({ isLoading: false, error: null }),
}));
