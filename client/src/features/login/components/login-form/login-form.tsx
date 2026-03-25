import { useTranslation } from 'react-i18next';
import { Form } from '@/components';
import type { LoginFormProps } from './login-form.props';

export default function LoginForm({ onSuccess, className }: LoginFormProps) {
	const { t } = useTranslation();
	const { isLoading, login } = useLoginForm();

	const handleSubmit = async (values: Record<string, string>) => {
		const success = await login(values.token);
		if (success) {
			onSuccess?.();
		}
	};

	return (
		<div className={className}>
			<Form
				fields={[
					{
						name: 'token',
						label: t('login.fields.token.label'),
						placeholder: t('login.fields.token.placeholder'),
						type: 'password',
						required: true,
						testId: 'login-token',
					},
				]}
				onSubmit={handleSubmit}
				submitLabel={t('common.login')}
				loading={isLoading}
				showSubmit
				fullWidth
				testId="login-form"
			/>
		</div>
	);
}

// ── internal hook ──────────────────────────────────────────────────────────────

import { useLoginStore } from '../../store/login.store';

function useLoginForm() {
	const isLoading = useLoginStore((s) => s.isLoading);
	const login = useLoginStore((s) => s.login);

	return { isLoading, login };
}
