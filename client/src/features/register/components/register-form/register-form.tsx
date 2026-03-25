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
					},
					{
						name: 'email',
						label: t('register.fields.email.label'),
						placeholder: t('register.fields.email.placeholder'),
						type: 'email',
						required: true,
					},
					{
						name: 'password',
						label: t('register.fields.password.label'),
						placeholder: t('register.fields.password.placeholder'),
						type: 'password',
						required: true,
					},
					{
						name: 'confirmPassword',
						label: t('register.fields.confirmPassword.label'),
						placeholder: t('register.fields.confirmPassword.placeholder'),
						type: 'password',
						required: true,
					},
				]}
				onSubmit={handleSubmit}
				submitLabel={t('common.register')}
				loading={isLoading}
				showSubmit
				fullWidth
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
