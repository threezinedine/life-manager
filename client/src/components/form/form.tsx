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
		testId,
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

	const handleChange = (name: string, value: string) => {
		setValues((prev) => ({ ...prev, [name]: value }));

		// Re-validate on every change so custom validator errors appear immediately
		setErrors((prev) => {
			const field = fields.find((f) => f.name === name);
			if (!field) return prev;
			return { ...prev, [name]: validateField(field, value) };
		});
	};

	const validateAll = useCallback(() => {
		const newErrors: Record<string, string> = {};
		for (const field of fields) {
			newErrors[field.name] = validateField(field, values[field.name]);
		}
		setErrors(newErrors);
		return Object.values(newErrors).some((e) => e !== '');
	}, [fields, values]);

	const submit = useCallback(() => {
		const hasErrors = validateAll();
		if (hasErrors) return;
		onSubmit(values);
	}, [validateAll, values, onSubmit]);

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
			data-testid={testId}
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
					testId={field.testId}
				/>
			))}

			{showSubmit && (
				<Button
					htmlType="submit"
					label={submitLabel}
					variant={Variant.Primary}
					loading={loading}
					testId={`${testId}-submit`}
					className={styles['submit-button']}
				/>
			)}
		</form>
	);
});

export default Form;
export { FormHandle };
