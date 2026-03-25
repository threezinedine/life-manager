import { InputVariant, type InputProps } from './input.props';
import styles from './input.module.scss';
import clsx from 'clsx';
import { Size } from '@/data/props';

export default function Input({
	label,
	placeholder,
	value,
	onChangeText,
	size = Size.Medium,
	variant = InputVariant.Default,
	error,
	hint,
	disabled = false,
	loading = false,
	ariaLabel,
	fullWidth = false,
	className,
	...rest
}: InputProps) {
	const hasError = Boolean(error);
	const isErrorVariant = hasError || variant === InputVariant.Error;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disabled || loading) return;
		onChangeText?.(e.target.value);
	};

	return (
		<div
			className={clsx(styles.container, className, {
				[styles['container--full-width']]: fullWidth,
			})}
		>
			<div
				className={clsx(styles.wrapper, styles[`wrapper--${size}`], {
					[styles['wrapper--error']]: isErrorVariant,
					[styles['wrapper--disabled']]: disabled,
					[styles['wrapper--loading']]: loading,
				})}
			>
				<input
					id={label}
					className={styles.input}
					placeholder={placeholder ?? ' '}
					value={value}
					onChange={handleChange}
					disabled={disabled || loading}
					aria-label={ariaLabel ?? label}
					aria-invalid={isErrorVariant}
					aria-describedby={
						error
							? `${label ?? ariaLabel}-error`
							: hint
								? `${label ?? ariaLabel}-hint`
								: undefined
					}
					{...rest}
				/>

				{loading && <span className={styles.spinner} />}

				{/* Floating label */}
				{label && (
					<label htmlFor={label} className={styles.label}>
						{label}
					</label>
				)}

				{/* Animated underline */}
				<span className={styles.underline} />
			</div>

			{error && (
				<span
					id={`${label ?? ariaLabel}-error`}
					className={styles.error}
					role="alert"
				>
					{error}
				</span>
			)}

			{hint && !error && (
				<span id={`${label ?? ariaLabel}-hint`} className={styles.hint}>
					{hint}
				</span>
			)}
		</div>
	);
}
