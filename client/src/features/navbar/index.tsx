import Navbar from '@/components/navbar';
import { UserIcon } from '@/icons';
import { Button } from '@/components/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FinalNavbar() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Navbar
			logo={<UserIcon />}
			branch="Auth"
			authPart={
				<>
					<Button
						label={t('login.button')}
						onClick={() => navigate('/login')}
					/>
					<Button
						label={t('register.button')}
						onClick={() => navigate('/register')}
					/>
				</>
			}
		/>
	);
}
