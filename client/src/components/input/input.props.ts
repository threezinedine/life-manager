import type { Size } from '@/data/props';

export enum InputVariant {
	Default = 'default',
	Error = 'error',
}

export interface InputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	/** Label displayed above the input */
	label?: string;
	/** Placeholder text shown when empty */
	placeholder?: string;
	/** Current input value (required for controlled usage) */
	value?: string;
	/** Change handler — receives the new string value */
	onChangeText?: (value: string) => void;
	/** Input size */
	size?: Size;
	/** Visual style variant */
	variant?: InputVariant;
	/** Error message — renders the input in error state and shows message below */
	error?: string;
	/** Hint text shown below the input (ignored if error is set) */
	hint?: string;
	/** Disables the input */
	disabled?: boolean;
	/** Shows a loading spinner inside the input */
	loading?: boolean;
	/** Accessible label (used as aria-label on the input) */
	ariaLabel?: string;
	/** Makes the input fill its container width */
	fullWidth?: boolean;
	/** Test ID for e2e testing */
	testId?: string;
}
