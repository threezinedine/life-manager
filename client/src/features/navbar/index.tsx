import Navbar from '@/components/navbar';
import { UserIcon, SettingsIcon, LogOutIcon } from '@/icons';
import { Button } from '@/components/button';
import DropMenu, { type DropMenuEntry } from '@/components/dropmenu';
import Avatar from '@/components/avatar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthTokenStore } from '@/stores/auth-token.store';

export default function FinalNavbar() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const token = useAuthTokenStore((state) => state.token);
	const clearAuth = useAuthTokenStore((state) => state.clearAuth);

	const handleLogout = () => {
		clearAuth();
		navigate('/login');
	};

	const menuItems: DropMenuEntry[] = [
		{
			label: 'Profile',
			icon: <UserIcon />,
			onClick: () => alert('Profile'),
		},
		{
			label: 'Settings',
			icon: <SettingsIcon />,
			onClick: () => alert('Settings'),
		},
		{ divider: true },
		{
			label: 'Log out',
			icon: <LogOutIcon />,
			onClick: handleLogout,
			danger: true,
		},
	];

	const authPart = token ? (
		<DropMenu items={menuItems} align="right">
			<Avatar name="User" />
		</DropMenu>
	) : (
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
	);

	return (
		<Navbar
			logo={<UserIcon />}
			branch="Auth"
			authPart={authPart}
		/>
	);
}
