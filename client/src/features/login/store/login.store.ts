import { create } from 'zustand';
import type { LoginState } from '../types/login.types';
import { useToastStore } from '@/components/toast';
import { loginApi } from '../api/login.api';

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
			await loginApi({ token });

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
