import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/features/register';
import { Button, Modal } from '@/components';
import { Variant } from '@/components/button/button.props';
import { Size } from '@/data/props';
import { useToastStore } from '@/components/toast';
import styles from './auth.module.scss';
import { Link } from 'react-router-dom';

export default function Register() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [generatedToken, setGeneratedToken] = useState<string | null>(null);

	const handleRegisterSuccess = (token: string) => {
		setGeneratedToken(token);
	};

	const handleCopyToClipboard = async () => {
		if (!generatedToken) return;

		await navigator.clipboard.writeText(generatedToken);
		useToastStore
			.getState()
			.success('Token copied to clipboard!', undefined, 'register-token-copied-toast');
		navigate('/login');
	};

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

				<RegisterForm onSuccess={handleRegisterSuccess} />

				<p className={styles['auth-footer']}>
					{t('register.hasAccount')}{' '}
					<Link to="/login" className={styles['auth-link']}>
						{t('common.login')}
					</Link>
				</p>
			</div>

			<Modal
				open={Boolean(generatedToken)}
				title="Registration successful"
				onClose={() => {}}
				closeOnBackdrop={false}
				testId="register-success-modal"
				actions={
					<Button
						label="Copy to clipboard"
						variant={Variant.Primary}
						size={Size.Small}
						onClick={handleCopyToClipboard}
						testId="register-copy-token"
					/>
				}
			>
				<p style={{ margin: 0, fontWeight: 600 }}>Your token:</p>
				<code
					style={{
						display: 'block',
						marginTop: '0.5rem',
						padding: '0.75rem',
						borderRadius: '0.5rem',
						background: 'var(--input-disabled-bg)',
						wordBreak: 'break-all',
						fontSize: '0.875rem',
					}}
				>
					{generatedToken}
				</code>
			</Modal>
		</div>
	);
}
