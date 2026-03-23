import 'react';
import { ButtonProps } from './props';
import styles from './button.module.scss';
import clsx from 'clsx';
import { Size, Variant } from '@/data/props';

export default function Button({
	label,
	onClick,
	size = Size.Medium,
	variant = Variant.Primary,
	borderRadius = Size.Medium,
	disabled = false,
	loading = false,
}: ButtonProps) {
	const buttonClass = clsx(styles.button, {
		[styles['button--small']]: size === Size.Small,
		[styles['button--medium']]: size === Size.Medium,
		[styles['button--large']]: size === Size.Large,
		[styles['button--full-width']]: size === Size.FullWidth,
		[styles['button--primary']]: variant === Variant.Primary,
		[styles['button--secondary']]: variant === Variant.Secondary,
		[styles['button--tertiary']]: variant === Variant.Tertiary,
		[styles['button--warn']]: variant === Variant.Warn,
		[styles['button--ghost']]: variant === Variant.Ghost,
		[styles['button--danger']]: variant === Variant.Danger,
		[styles['button--success']]: variant === Variant.Success,
		[styles['button--outline']]: variant === Variant.Outline,
		[styles['button--border-radius-small']]: borderRadius === Size.Small,
		[styles['button--border-radius-medium']]: borderRadius === Size.Medium,
		[styles['button--border-radius-large']]: borderRadius === Size.Large,
		[styles['button--loading']]: loading,
	});

	return (
		<button
			className={buttonClass}
			onClick={onClick}
			type="button"
			disabled={disabled || loading}
		>
			<span className={clsx(styles.label, { [styles['label--hidden']]: loading })}>
				{label}
			</span>
			{loading && <span className={styles.spinner} />}
		</button>
	);
}
