import type { Size } from '@/data/props';

export type ValidatorFn = (value: string) => string | null;

/** Methods the parent can call via the form ref */
export interface FormHandle {
	/** Trigger validation + submit from outside the form */
	submit: () => void;
	/** Get the current field values */
	getValues: () => Record<string, string>;
}

/** Shape of a single field in the form */
export interface FormField {
	/** Unique key for the field — used as the key in submitted values */
	name: string;
	/** Label displayed above the field */
	label?: string;
	/** Placeholder shown in the input */
	placeholder?: string;
	/** HTML input type */
	type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number';
	/** Initial value for this field */
	defaultValue?: string;
	/** Whether the field must have a value to submit */
	required?: boolean;
	/** Per-field validator — return null on success, error string on failure */
	validator?: ValidatorFn;
	/** Hint text shown below the field */
	hint?: string;
	/** Input size */
	size?: Size;
	/** Disables the field */
	disabled?: boolean;
	/** Test ID for e2e testing */
	testId?: string;
}

export interface FormProps {
	/** Ordered list of field configurations */
	fields: FormField[];
	/** Called on submit with the field values map */
	onSubmit: (values: Record<string, string>) => void;
	/** Label for the submit button */
	submitLabel?: string;
	/** Disables all fields and the submit button while true */
	loading?: boolean;
	/** Shows the built-in submit button (true by default) */
	showSubmit?: boolean;
	/** Makes every field span full width */
	fullWidth?: boolean;
	/** Test ID for the submit button */
	testId?: string;
	/** Additional class on the form container */
	className?: string;
}
