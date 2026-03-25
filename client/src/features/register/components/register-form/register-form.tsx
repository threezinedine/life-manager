import { useTranslation } from 'react-i18next';
import { Form } from '@/components';
import type { RegisterFormProps } from './register-form.props';
import styles from './register-form.module.scss';

export default function RegisterForm({ onSuccess, className }: RegisterFormProps) {
	const { t } = useTranslation();
	const { isLoading, error, register } = useRegisterForm();

	const handleSubmit = async (values: Record<string, string>) => {
		await register(
			values.username,
			values.email,
			values.password,
			values.confirmPassword
		);
		onSuccess?.();
	};

	return (
		<div className={className}>
			{error && (
				<div className={styles['error-banner']} role="alert">
					<span className={styles['error-icon']}>!</span>
					{error}
				</div>
			)}

			<Form
				fields={[
					{
						name: 'username',
						label: t('register.fields.username.label'),
						placeholder: t('register.fields.username.placeholder'),
						type: 'text',
						required: true,
						testId: 'register-username',
					},
					{
						name: 'email',
						label: t('register.fields.email.label'),
						placeholder: t('register.fields.email.placeholder'),
						type: 'email',
						required: true,
						testId: 'register-email',
					},
					{
						name: 'password',
						label: t('register.fields.password.label'),
						placeholder: t('register.fields.password.placeholder'),
						type: 'password',
						required: true,
						testId: 'register-password',
					},
					{
						name: 'confirmPassword',
						label: t('register.fields.confirmPassword.label'),
						placeholder: t('register.fields.confirmPassword.placeholder'),
						type: 'password',
						required: true,
						testId: 'register-confirm-password',
					},
				]}
				onSubmit={handleSubmit}
				submitLabel={t('common.register')}
				loading={isLoading}
				showSubmit
				fullWidth
				testId="register-form"
			/>
		</div>
	);
}

// ── internal hook ──────────────────────────────────────────────────────────────

import { useRegisterStore } from '../../store/register.store';

function useRegisterForm() {
	const isLoading = useRegisterStore((s) => s.isLoading);
	const error = useRegisterStore((s) => s.error);
	const register = useRegisterStore((s) => s.register);

	return { isLoading, error, register };
}
