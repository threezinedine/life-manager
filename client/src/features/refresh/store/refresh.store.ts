import { create } from 'zustand';
import type { RefreshState } from '../types/refresh.types';
import { useToastStore } from '@/components/toast';
import { refreshApi } from '../api/refresh.api';
import { useAuthTokenStore } from '@/stores/auth-token.store';

interface RefreshStore extends RefreshState {
	refresh: (email: string, oldToken: string) => Promise<boolean>;
	reset: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
	isLoading: false,

	refresh: async (email: string, oldToken: string) => {
		set({ isLoading: true });
		try {
			const response = await refreshApi({ email, oldToken });
			useAuthTokenStore.getState().setToken(response.token);
			useToastStore
				.getState()
				.success('Token refreshed successfully!', undefined, 'refresh-success-toast');
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
