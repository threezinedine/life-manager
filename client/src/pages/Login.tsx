import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/login';
import styles from './auth.module.scss';
import { Link } from 'react-router-dom';

export default function Login() {
	const { t } = useTranslation();

	return (
		<div className={styles['auth-page']}>
			<div className={styles['auth-card']}>
				<div className={styles['auth-header']}>
					<h1 className={styles['auth-title']}>
						{t('login.pageTitle')}
					</h1>
					<p className={styles['auth-subtitle']}>
						{t('login.subtitle')}
					</p>
				</div>

				<LoginForm />

				<p className={styles['auth-footer']}>
					{t('login.noAccount')}{' '}
					<Link to="/register" className={styles['auth-link']}>
						{t('common.register')}
					</Link>
				</p>
			</div>
		</div>
	);
}
