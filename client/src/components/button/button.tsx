import 'react';
import { ButtonProps } from './button.props';
import styles from './button.module.scss';
import clsx from 'clsx';
import { Size } from '@/data/props';
import { Variant } from './button.props';

export default function Button({
	label,
	onClick,
	size = Size.Medium,
	variant = Variant.Primary,
	borderRadius = Size.Medium,
	htmlType = 'button',
	disabled = false,
	loading = false,
	leftIcon,
	rightIcon,
	ariaLabel,
	className,
}: ButtonProps) {
	const buttonClass = clsx(styles.button, className, {
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

	const hasLabel = label != null && label !== '';
	const iconOnly = !hasLabel && !loading;
	const centerLeft = iconOnly && leftIcon && !rightIcon;
	const centerRight = iconOnly && rightIcon && !leftIcon;

	return (
		<button
			className={clsx(
				buttonClass,
				{ [styles['button--icon-only']]: iconOnly },
				className
			)}
			onClick={onClick}
			type={htmlType}
			disabled={disabled || loading}
			aria-label={ariaLabel}
		>
			{leftIcon && (
				<span
					className={clsx(styles.icon, {
						[styles['icon--centered']]: centerLeft,
					})}
				>
					{leftIcon}
				</span>
			)}
			{hasLabel && (
				<span
					className={clsx(styles.label, {
						[styles['label--hidden']]: loading,
					})}
				>
					{label}
				</span>
			)}
			{loading && <span className={styles.spinner} />}
			{rightIcon && (
				<span
					className={clsx(styles.icon, {
						[styles['icon--centered']]: centerRight,
					})}
				>
					{rightIcon}
				</span>
			)}
		</button>
	);
}
