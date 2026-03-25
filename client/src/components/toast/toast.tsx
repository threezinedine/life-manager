import { ReactNode } from 'react';
import ToastContainer from './toast-container';

interface ToastProps {
	children?: ReactNode;
}

export default function Toast({ children }: ToastProps) {
	return (
		<>
			{children}
			<ToastContainer />
		</>
	);
}

export { ToastVariant } from './toast.props';
export { useToast, useToastStore } from './toast-store';
