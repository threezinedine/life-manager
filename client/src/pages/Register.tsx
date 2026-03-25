import { useTranslation } from 'react-i18next';
import { RegisterForm } from '@/features/register';
import styles from './auth.module.scss';
import { Link } from 'react-router-dom';

export default function Register() {
	const { t } = useTranslation();

	return (
		<div className={styles['auth-page']}>
			<div className={styles['auth-card']}>
				<div className={styles['auth-header']}>
					<h1 className={styles['auth-title']}>
						{t('register.pageTitle')}
					</h1>
					<p className={styles['auth-subtitle']}>
						{t('register.subtitle')}
					</p>
				</div>

				<RegisterForm />

				<p className={styles['auth-footer']}>
					{t('register.hasAccount')}{' '}
					<Link to="/login" className={styles['auth-link']}>
						{t('common.login')}
					</Link>
				</p>
			</div>
		</div>
	);
}
