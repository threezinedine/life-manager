import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RefreshForm } from '@/features/refresh';
import { useAuthTokenStore } from '@/stores/auth-token.store';
import styles from './auth.module.scss';
import { Link } from 'react-router-dom';

export default function Refresh() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const token = useAuthTokenStore((state) => state.token);

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

				<RefreshForm onSuccess={() => navigate('/dashboard')} initialToken={token ?? undefined} />

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
