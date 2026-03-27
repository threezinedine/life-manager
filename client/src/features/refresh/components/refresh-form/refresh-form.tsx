import { useTranslation } from 'react-i18next';
import { Form } from '@/components';
import type { RefreshFormProps } from './refresh-form.props';
import { useAuthTokenStore } from '@/stores/auth-token.store';

export default function RefreshForm({
	onSuccess,
	className,
}: RefreshFormProps) {
	const { t } = useTranslation();
	const { isLoading, refresh } = useRefreshForm();
	const { validate } = useAuthTokenStore();

	const handleSubmit = async (values: Record<string, string>) => {
		const success = await refresh(values.email, values.oldToken);
		if (success) {
			validate();
			onSuccess?.();
		}
	};

	return (
		<div className={className}>
			<Form
				fields={[
					{
						name: 'email',
						label: t('refresh.fields.email.label'),
						placeholder: t('refresh.fields.email.placeholder'),
						type: 'email',
						required: true,
						testId: 'refresh-email',
					},
				]}
				onSubmit={handleSubmit}
				submitLabel={t('refresh.button')}
				loading={isLoading}
				showSubmit
				fullWidth
				testId="refresh-form"
			/>
		</div>
	);
}

// ── internal hook ──────────────────────────────────────────────────────────────

import { useRefreshStore } from '../../store/refresh.store';

function useRefreshForm() {
	const isLoading = useRefreshStore((s) => s.isLoading);
	const refresh = useRefreshStore((s) => s.refresh);

	return { isLoading, refresh };
}
