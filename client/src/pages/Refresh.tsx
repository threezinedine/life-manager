import { useTranslation } from 'react-i18next';
import { RefreshForm } from '@/features/refresh';
import { useAuthTokenStore } from '@/stores/auth-token.store';
import styles from './auth.module.scss';
import { Link } from 'react-router-dom';

export default function Refresh() {
	const { t } = useTranslation();
	const validate = useAuthTokenStore((state) => state.validate);

	return (
		<div className={styles['auth-page']}>
			<div className={styles['auth-card']}>
				<div className={styles['auth-header']}>
					<h1 className={styles['auth-title']}>
						{t('refresh.pageTitle')}
					</h1>
					<p className={styles['auth-subtitle']}>
						{t('refresh.subtitle')}
					</p>
				</div>

				<RefreshForm onSuccess={validate} />

				<p className={styles['auth-footer']}>
					{t('refresh.backToLogin')}{' '}
					<Link to="/login" className={styles['auth-link']}>
						{t('common.login')}
					</Link>
				</p>
			</div>
		</div>
	);
}
