import { create } from 'zustand';
import { ToastVariant } from './toast.props';

const DEFAULT_DURATION = 3000;

let timerIds: ReturnType<typeof setTimeout>[] = [];

export const useToastStore = create<ToastStore>((set, get) => ({
	toasts: [],

	addToast: (message, variant = ToastVariant.Info, duration = DEFAULT_DURATION) => {
		const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
		const newToast = { id, message, variant, duration };

		set((state) => ({ toasts: [...state.toasts, newToast] }));

		if (duration > 0) {
			const timerId = setTimeout(() => {
				set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
			}, duration);
			timerIds.push(timerId);
		}
	},

	removeToast: (id) => {
		set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
	},

	removeAll: () => {
		set({ toasts: [] });
	},

	reset: () => {
		timerIds.forEach(clearTimeout);
		timerIds = [];
		set({ toasts: [] });
	},

	success: (message, duration) => {
		get().addToast(message, ToastVariant.Success, duration ?? DEFAULT_DURATION);
	},

	error: (message, duration) => {
		get().addToast(message, ToastVariant.Error, duration ?? DEFAULT_DURATION);
	},

	warning: (message, duration) => {
		get().addToast(message, ToastVariant.Warning, duration ?? DEFAULT_DURATION);
	},

	info: (message, duration) => {
		get().addToast(message, ToastVariant.Info, duration ?? DEFAULT_DURATION);
	},
}));

export function useToast() {
	return useToastStore();
}

interface ToastStore {
	toasts: ToastItemData[];
	addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
	removeToast: (id: string) => void;
	removeAll: () => void;
	reset: () => void;
	success: (message: string, duration?: number) => void;
	error: (message: string, duration?: number) => void;
	warning: (message: string, duration?: number) => void;
	info: (message: string, duration?: number) => void;
}

interface ToastItemData {
	id: string;
	message: string;
	variant?: ToastVariant;
	duration?: number;
}
