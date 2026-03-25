import { create } from 'zustand';
import { ToastVariant } from './toast.props';

const DEFAULT_DURATION = 3000;

let timerIds: ReturnType<typeof setTimeout>[] = [];

export const useToastStore = create<ToastStore>((set, get) => ({
	toasts: [],

	addToast: (
		message,
		variant = ToastVariant.Info,
		duration = DEFAULT_DURATION,
		testId?: string
	) => {
		const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
		const newToast = { id, message, variant, duration, testId };

		set((state) => ({ toasts: [...state.toasts, newToast] }));

		if (duration > 0) {
			const timerId = setTimeout(() => {
				set((state) => ({
					toasts: state.toasts.filter((t) => t.id !== id),
				}));
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

	success: (message, duration, testId) => {
		get().addToast(
			message,
			ToastVariant.Success,
			duration ?? DEFAULT_DURATION,
			testId
		);
	},

	error: (message, duration, testId) => {
		get().addToast(
			message,
			ToastVariant.Error,
			duration ?? DEFAULT_DURATION,
			testId
		);
	},

	warning: (message, duration, testId) => {
		get().addToast(
			message,
			ToastVariant.Warning,
			duration ?? DEFAULT_DURATION,
			testId
		);
	},

	info: (message, duration, testId) => {
		get().addToast(
			message,
			ToastVariant.Info,
			duration ?? DEFAULT_DURATION,
			testId
		);
	},
}));

export function useToast() {
	return useToastStore();
}

interface ToastStore {
	toasts: ToastItemData[];
	addToast: (
		message: string,
		variant?: ToastVariant,
		duration?: number,
		testId?: string
	) => void;
	removeToast: (id: string) => void;
	removeAll: () => void;
	reset: () => void;
	success: (message: string, duration?: number, testId?: string) => void;
	error: (message: string, duration?: number, testId?: string) => void;
	warning: (message: string, duration?: number, testId?: string) => void;
	info: (message: string, duration?: number, testId?: string) => void;
}

interface ToastItemData {
	id: string;
	message: string;
	variant?: ToastVariant;
	duration?: number;
}
