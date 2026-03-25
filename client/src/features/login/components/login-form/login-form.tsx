import { useTranslation } from 'react-i18next';
import { Form } from '@/components';
import type { LoginFormProps } from './login-form.props';
import styles from './login-form.module.scss';

export default function LoginForm({ onSuccess, className }: LoginFormProps) {
	const { t } = useTranslation();
	const { isLoading, error, login } = useLoginForm();

	const handleSubmit = async (values: Record<string, string>) => {
		await login(values.email, values.password);
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
						name: 'email',
						label: t('login.fields.email.label'),
						placeholder: t('login.fields.email.placeholder'),
						type: 'email',
						required: true,
					},
					{
						name: 'password',
						label: t('login.fields.password.label'),
						placeholder: t('login.fields.password.placeholder'),
						type: 'password',
						required: true,
					},
				]}
				onSubmit={handleSubmit}
				submitLabel={t('common.login')}
				loading={isLoading}
				showSubmit
				fullWidth
			/>
		</div>
	);
}

// ── internal hook ──────────────────────────────────────────────────────────────

import { useLoginStore } from '../../store/login.store';

function useLoginForm() {
	const isLoading = useLoginStore((s) => s.isLoading);
	const error = useLoginStore((s) => s.error);
	const login = useLoginStore((s) => s.login);

	return { isLoading, error, login };
}
