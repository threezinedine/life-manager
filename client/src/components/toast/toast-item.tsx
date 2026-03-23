import { useEffect, useState } from 'react';
import { ToastItemData, ToastVariant } from './toast.props';
import styles from './toast.module.scss';
import clsx from 'clsx';
import { CheckIcon, XIcon, WarningIcon, InfoIcon } from '@/icons';

interface ToastItemProps {
	toast: ToastItemData;
	onRemove: (id: string) => void;
}

const VARIANT_COLORS: Record<ToastVariant, string> = {
	[ToastVariant.Success]: '#10b981',
	[ToastVariant.Error]: '#ef4444',
	[ToastVariant.Warning]: '#f59e0b',
	[ToastVariant.Info]: '#0ea5e9',
};

const VARIANT_ICONS: Record<ToastVariant, React.ReactNode> = {
	[ToastVariant.Success]: <CheckIcon />,
	[ToastVariant.Error]: <XIcon />,
	[ToastVariant.Warning]: <WarningIcon />,
	[ToastVariant.Info]: <InfoIcon />,
};

export default function ToastItem({ toast, onRemove }: ToastItemProps) {
	const { id, message, variant = ToastVariant.Info, duration } = toast;
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		if (!duration || duration <= 0) return;

		const interval = 50; // ms per tick
		let elapsed = 0;

		const timer = setInterval(() => {
			elapsed += interval;
			const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
			setProgress(remaining);

			if (elapsed >= duration) {
				clearInterval(timer);
				onRemove(id);
			}
		}, interval);

		return () => clearInterval(timer);
	}, [id, duration, onRemove]);

	const itemClass = clsx(styles.toastItem, styles[`toastItem--${variant}`]);
	const barColor = VARIANT_COLORS[variant];

	return (
		<div className={itemClass} role="alert">
			<div className={styles.content}>
				<span className={styles.icon}>{VARIANT_ICONS[variant]}</span>
				<span className={styles.message}>{message}</span>
				<button
					className={styles.closeButton}
					onClick={() => onRemove(id)}
					aria-label="Close"
					type="button"
				>
					<XIcon />
				</button>
			</div>
			<div className={styles.progressBar}>
				<div
					className={styles.progressFill}
					style={{
						width: `${progress}%`,
						backgroundColor: barColor,
					}}
				/>
			</div>
		</div>
	);
}
