import { useToastStore } from './toast-store';
import ToastItem from './toast-item';
import styles from './toast.module.scss';

export default function ToastContainer() {
	const toasts = useToastStore((state) => state.toasts);
	const removeToast = useToastStore((state) => state.removeToast);

	return (
		<div className={styles.toastContainer} aria-live="polite" data-testid="toast-container">
			{toasts.map((toast) => (
				<ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
			))}
		</div>
	);
}
