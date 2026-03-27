import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import styles from './modal.module.scss';
import clsx from 'clsx';
import { XIcon } from '@/icons';
import type { ModalProps } from './modal.props';

export interface ModalRef {
	open: () => void;
	close: () => void;
}

export const Modal = forwardRef<ModalRef, ModalProps>(
	(
		{
			open: openProp,
			title,
			onClose,
			children,
			actions,
			closeOnBackdrop = true,
			testId,
			className,
		},
		forwardedRef
	) => {
		const dialogRef = useRef<HTMLDivElement>(null);
		const isControlled = openProp !== undefined;
		const isOpen = openProp ?? false;

		// ── Imperative handle ────────────────────────────────────────────────────
		useImperativeHandle(forwardedRef, () => ({
			open: () => {
				if (isControlled) {
					console.warn(
						'[Modal] open() has no effect on a controlled Modal. ' +
							'Manage the `open` prop in the parent to open it.'
					);
				}
			},
			close: onClose,
		}));

		// ── Focus dialog on open ───────────────────────────────────────────────
		useEffect(() => {
			if (!isOpen) return;
			const el = dialogRef.current;
			if (!el) return;
			el.focus();
		}, [isOpen]);

		// ── Close on Escape ────────────────────────────────────────────────────
		useEffect(() => {
			if (!isOpen) return;
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') onClose();
			};
			document.addEventListener('keydown', handleKeyDown);
			return () => document.removeEventListener('keydown', handleKeyDown);
		}, [isOpen, onClose]);

		// ── Lock body scroll while open ───────────────────────────────────────
		useEffect(() => {
			if (isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
			return () => {
				document.body.style.overflow = '';
			};
		}, [isOpen]);

		const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!closeOnBackdrop) return;
			if (e.target !== e.currentTarget) return;
			onClose();
		};

		if (!isOpen) return null;

		return (
			<div
				className={styles.backdrop}
				onClick={handleBackdropClick}
				role="presentation"
			>
				<div
					ref={dialogRef}
					className={clsx(styles.dialog, className)}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
					tabIndex={-1}
					data-testid={testId}
				>
					{/* Header */}
					<div className={styles.header}>
						<h2 id="modal-title" className={styles.title}>
							{title}
						</h2>
						<button
							className={styles.closeBtn}
							onClick={onClose}
							aria-label="Close modal"
							data-testid={
								testId ? `${testId}-close` : 'modal-close'
							}
						>
							<XIcon />
						</button>
					</div>

					{/* Content */}
					{children && (
						<div className={styles.content}>{children}</div>
					)}

					{/* Actions */}
					{actions && (
						<div className={styles.actions}>{actions}</div>
					)}
				</div>
			</div>
		);
	}
);

Modal.displayName = 'Modal';
