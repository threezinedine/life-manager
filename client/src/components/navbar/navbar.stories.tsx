import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';
import { Button } from '@/components/button';
import Avatar from '@/components/avatar';
import DropMenu, { type DropMenuEntry } from '@/components/dropmenu';
import { Variant } from '@/components/button/button.props';
import { Size } from '@/data/props';
import clsx from 'clsx';
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

export const Default: Story = {
	render: () => {
		const [checked, setChecked] = useState(true);
		return (
			<div
				className={clsx({ light: checked, dark: !checked })}
				style={{
					backgroundColor: checked ? '#f0f0f0' : '#333',
					color: checked ? '#333' : '#f0f0f0',
					minHeight: '100vh',
				}}
			>
				<Navbar
					logo={<LogoIcon />}
					branch="main"
					checked={checked}
					onToggle={setChecked}
				/>
			</div>
		);
	},
};

export const DarkMode: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);
		return (
			<div
				className={clsx({ light: checked, dark: !checked })}
				style={{
					backgroundColor: checked ? '#f0f0f0' : '#333',
					color: checked ? '#333' : '#f0f0f0',
					minHeight: '100vh',
				}}
			>
				<Navbar
					logo={<LogoIcon />}
					branch="main"
					checked={checked}
					onToggle={setChecked}
				/>
			</div>
		);
	},
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
	render: () => {
		const [checked, setChecked] = useState(false);
		return (
			<div
				className={clsx({ light: checked, dark: !checked })}
				style={{
					backgroundColor: checked ? '#f0f0f0' : '#333',
					color: checked ? '#333' : '#f0f0f0',
					minHeight: '100vh',
				}}
			>
				<Navbar
					logo={<LogoIcon />}
					branch="main"
					checked={checked}
					onToggle={setChecked}
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
			</div>
		);
	},
};

export const AvatarDropdown: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);
		return (
			<div
				className={clsx({ light: checked, dark: !checked })}
				style={{
					backgroundColor: checked ? '#f0f0f0' : '#333',
					color: checked ? '#333' : '#f0f0f0',
					minHeight: '100vh',
				}}
			>
				<Navbar
					logo={<LogoIcon />}
					branch="main"
					checked={checked}
					onToggle={setChecked}
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
			</div>
		);
	},
};
