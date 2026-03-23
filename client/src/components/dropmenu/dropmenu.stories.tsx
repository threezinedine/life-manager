import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropMenu, { type DropMenuRef, type DropMenuEntry } from './dropmenu';
import Button from '@/components/button';
import Avatar from '@/components/avatar';
import {
	TrashIcon,
	EditIcon,
	CopyIcon,
	DownloadIcon,
	SettingsIcon,
} from '@/icons';
import { Size } from '@/data/props';
import { Variant } from '../button/button.props';

const meta: Meta<typeof DropMenu> = {
	title: 'Components/DropMenu',
	component: DropMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const containerStyle = {
	padding: '3rem',
	minHeight: '100vh',
	background: '#f0f0f0',
};

const containerDarkStyle = {
	...containerStyle,
	background: '#1f2937',
};

const standardItems: DropMenuEntry[] = [
	{
		label: 'Edit',
		icon: <EditIcon />,
		shortcut: '⌘E',
		onClick: () => alert('Edit'),
	},
	{
		label: 'Duplicate',
		icon: <CopyIcon />,
		shortcut: '⌘D',
		onClick: () => alert('Duplicate'),
	},
	{
		label: 'Download',
		icon: <DownloadIcon />,
		shortcut: '⌘↓',
		onClick: () => alert('Download'),
	},
	{ divider: true },
	{
		label: 'Settings',
		icon: <SettingsIcon />,
		onClick: () => alert('Settings'),
	},
	{
		label: 'Delete',
		icon: <TrashIcon />,
		onClick: () => alert('Delete'),
		danger: true,
	},
];

export const Default: Story = {
	render: () => (
		<div style={containerStyle}>
			<DropMenu items={standardItems}>
				<Button
					label="Options"
					variant={Variant.Tertiary}
					size={Size.Medium}
				/>
			</DropMenu>
		</div>
	),
};

export const RightAligned: Story = {
	render: () => (
		<div style={containerStyle}>
			<DropMenu items={standardItems} align="right">
				<Button
					label="Right Aligned"
					variant={Variant.Tertiary}
					size={Size.Medium}
				/>
			</DropMenu>
		</div>
	),
};

export const WithAvatarTrigger: Story = {
	render: () => (
		<div style={containerStyle}>
			<DropMenu items={standardItems}>
				<Avatar
					src="https://i.pravatar.cc/150?img=32"
					name="Sarah Wilson"
					size={Size.Medium}
				/>
			</DropMenu>
		</div>
	),
};

export const WithIconButtonTrigger: Story = {
	render: () => (
		<div style={containerStyle}>
			<DropMenu items={standardItems}>
				<Button
					variant={Variant.Tertiary}
					size={Size.Small}
					leftIcon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="1" />
							<circle cx="12" cy="5" r="1" />
							<circle cx="12" cy="19" r="1" />
						</svg>
					}
				/>
			</DropMenu>
		</div>
	),
};

export const ProgrammaticControl: Story = {
	render: () => {
		const menuRef = useRef<DropMenuRef>(null);
		return (
			<div style={containerStyle}>
				<DropMenu ref={menuRef} items={standardItems}>
					<Button
						label="Menu"
						variant={Variant.Primary}
						size={Size.Medium}
					/>
				</DropMenu>
				<div
					style={{
						display: 'flex',
						gap: '0.5rem',
						marginTop: '1rem',
					}}
				>
					<Button
						label="Open"
						variant={Variant.Outline}
						size={Size.Small}
						onClick={() => menuRef.current?.open()}
					/>
					<Button
						label="Close"
						variant={Variant.Outline}
						size={Size.Small}
						onClick={() => menuRef.current?.close()}
					/>
				</div>
			</div>
		);
	},
};

export const DarkMode: Story = {
	render: () => (
		<div className="dark" style={containerDarkStyle}>
			<DropMenu items={standardItems}>
				<Avatar
					src="https://i.pravatar.cc/150?img=47"
					name="Mike Brown"
					size={Size.Medium}
				/>
			</DropMenu>
		</div>
	),
};
