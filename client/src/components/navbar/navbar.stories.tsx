import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';
import { Button } from '@/components/button';
import Avatar from '@/components/avatar';
import DropMenu, { type DropMenuEntry } from '@/components/dropmenu';
import { Variant } from '@/components/button/button.props';
import { Size } from '@/data/props';
import { useThemeStore, ThemeProvider } from '@/features/theme';
import { SettingsIcon, LogOutIcon, UserIcon } from '@/icons';

const LogoIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>
);

const meta: Meta<typeof Navbar> = {
	title: 'Components/Navbar',
	component: Navbar,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const STORY_STYLES = {
	light: { backgroundColor: '#f0f0f0', color: '#333' },
	dark: { backgroundColor: '#1f2937', color: '#f9fafb' },
} as const;

function NavbarWrapper({
	darkAtDefault = false,
	authPart,
}: {
	darkAtDefault?: boolean;
	authPart?: React.ReactNode;
}) {
	const { theme, setTheme } = useThemeStore();

	useEffect(() => {
		setTheme(darkAtDefault ? 'dark' : 'light');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={theme}
			style={{ minHeight: '100vh', ...STORY_STYLES[theme] }}
		>
			<Navbar logo={<LogoIcon />} branch="main" authPart={authPart} />
		</div>
	);
}

export const Default: Story = {
	render: () => (
		<ThemeProvider>
			<NavbarWrapper />
		</ThemeProvider>
	),
};

export const DarkMode: Story = {
	render: () => (
		<ThemeProvider>
			<NavbarWrapper darkAtDefault />
		</ThemeProvider>
	),
};

const authMenuItems: DropMenuEntry[] = [
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
		onClick: () => alert('Log out'),
		danger: true,
	},
];

export const LoginRegister: Story = {
	render: () => (
		<ThemeProvider>
			<NavbarWrapper
				darkAtDefault
				authPart={
					<>
						<Button
							label="Login"
							variant={Variant.Ghost}
							size={Size.Small}
							onClick={() => alert('Login')}
						/>
						<Button
							label="Register"
							variant={Variant.Primary}
							size={Size.Small}
							onClick={() => alert('Register')}
						/>
					</>
				}
			/>
		</ThemeProvider>
	),
};

export const AvatarDropdown: Story = {
	render: () => (
		<ThemeProvider>
			<NavbarWrapper
				darkAtDefault
				authPart={
					<DropMenu items={authMenuItems} align="right">
						<Avatar
							src="https://i.pravatar.cc/150?img=32"
							name="Sarah Wilson"
							size={Size.Medium}
						/>
					</DropMenu>
				}
			/>
		</ThemeProvider>
	),
};
