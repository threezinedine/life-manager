import { useTranslation } from 'react-i18next';
import { Form } from '@/components';
import type { RegisterFormProps } from './register-form.props';

export default function RegisterForm({
	onSuccess,
	className,
}: RegisterFormProps) {
	const { t } = useTranslation();
	const { isLoading, register } = useRegisterForm();

	const handleSubmit = async (values: Record<string, string>) => {
		const token = await register(values.username, values.email);
		onSuccess?.(token);
	};

	return (
		<div className={className}>
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
	const register = useRegisterStore((s) => s.register);

	return { isLoading, register };
}
