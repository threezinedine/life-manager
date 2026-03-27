import { create } from 'zustand';
import type { RegisterState } from '../types/register.types';
import { useToastStore } from '@/components/toast';

interface RegisterStore extends RegisterState {
	token: string | null;
	setToken: (token: string | null) => void;
	register: (username: string, email: string) => Promise<string>;
	reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
	isLoading: false,
	error: null,
	token: null,

	setToken: (token) => set({ token }),

	register: async (name, email) => {
		set({ isLoading: true, token: null });
		try {
			const { registerApi } = await import('../api/register.api');
			const response = await registerApi({ name, email });

			const token = response.user.token;
			set({ token });
			return token;
		} catch (err) {
			const message = (err as Error).message;
			useToastStore
				.getState()
				.error(message, undefined, 'register-error-toast');
			throw err;
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => set({ isLoading: false, token: null }),
}));
