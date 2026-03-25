import { create } from 'zustand';
import type { RegisterState } from '../types/register.types';
import { useToastStore } from '@/components/toast';

interface RegisterStore extends RegisterState {
	register: (username: string, email: string) => Promise<void>;
	reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
	isLoading: false,
	error: null,

	register: async (name, email) => {
		set({ isLoading: true });
		try {
			const { registerApi } = await import('../api/register.api');
			await registerApi({ name, email });

			useToastStore
				.getState()
				.success(
					'Account created successfully!',
					undefined,
					'register-success-toast'
				);
		} catch (err) {
			const message = (err as Error).message;
			useToastStore
				.getState()
				.error(message, undefined, 'register-error-toast');
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => set({ isLoading: false }),
}));
