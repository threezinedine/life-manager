import { useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import { Variant } from '@/components/button/button.props';
import type { FormField, FormHandle, FormProps } from './form.props';
import styles from './form.module.scss';

/** Validate a single field and return its error string (or empty string on valid) */
const validateField = (field: FormField, value: string): string => {
	if (field.required && !value.trim()) {
		return 'This field is required';
	}
	if (field.validator) {
		return field.validator(value) ?? '';
	}
	return '';
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
	{
		fields,
		onSubmit,
		submitLabel = 'Submit',
		loading = false,
		showSubmit = true,
		fullWidth = false,
		className,
	},
	ref
) {
	const [values, setValues] = useState<Record<string, string>>(
		Object.fromEntries(fields.map((f) => [f.name, '']))
	);

	const [errors, setErrors] = useState<Record<string, string>>(
		Object.fromEntries(fields.map((f) => [f.name, validateField(f, '')]))
	);

	const revalidate = useCallback(
		(prev: Record<string, string>) => {
			const newErrors: Record<string, string> = {};
			for (const field of fields) {
				newErrors[field.name] = validateField(field, prev[field.name]);
			}
			setErrors(newErrors);
		},
		[fields]
	);

	const handleChange = (name: string, value: string) => {
		setValues((prev) => {
			const next = { ...prev, [name]: value };
			revalidate(next);
			return next;
		});
	};

	const submit = useCallback(() => {
		revalidate(values);
		onSubmit(values);
	}, [revalidate, values, onSubmit]);

	const handleSubmit = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		submit();
	};

	useImperativeHandle(ref, () => ({ submit, getValues: () => values }));

	return (
		<form
			className={`${styles.form}${className ? ` ${className}` : ''}`}
			onSubmit={handleSubmit}
			noValidate
		>
			{fields.map((field) => (
				<Input
					key={field.name}
					label={field.label}
					placeholder={field.placeholder}
					type={field.type}
					value={values[field.name]}
					onChangeText={(v) => handleChange(field.name, v)}
					loading={loading}
					error={errors[field.name]}
					hint={field.hint}
					size={field.size}
					disabled={field.disabled || loading}
					fullWidth={fullWidth}
				/>
			))}

			{showSubmit && (
				<Button
					htmlType="submit"
					label={submitLabel}
					variant={Variant.Primary}
					loading={loading}
					className={styles['submit-button']}
				/>
			)}
		</form>
	);
});

export default Form;
export { FormHandle };
