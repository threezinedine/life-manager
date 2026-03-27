import { create } from 'zustand';
import type { RefreshState } from '../types/refresh.types';
import { useToastStore } from '@/components/toast';
import { refreshApi } from '../api/refresh.api';

interface RefreshStore extends RefreshState {
	refresh: (email: string, oldToken: string) => Promise<boolean>;
	reset: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
	isLoading: false,

	refresh: async (email: string, oldToken: string) => {
		set({ isLoading: true });
		try {
			await refreshApi({ email, oldToken });
			useToastStore
				.getState()
				.success(
					'Token refreshed successfully!',
					undefined,
					'refresh-success-toast'
				);
			return true;
		} catch (err) {
			const message = (err as Error).message;
			useToastStore
				.getState()
				.error(message, undefined, 'refresh-error-toast');
			return false;
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => set({ isLoading: false }),
}));
