export enum ToastVariant {
	Success = 'success',
	Error = 'error',
	Warning = 'warning',
	Info = 'info',
}

export interface ToastItemData {
	id: string;
	message: string;
	variant?: ToastVariant;
	duration?: number;
	testId?: string;
}
