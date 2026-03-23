import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
	title: 'Components/Avatar',
	component: Avatar,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	padding: '1.5rem',
	minHeight: '100vh',
	background: '#f0f0f0',
};

const containerDarkStyle = {
	...containerStyle,
	background: '#1f2937',
};

export const Sizes: Story = {
	render: () => (
		<div style={containerStyle}>
			<Avatar name="John Doe" size="small" />
			<Avatar name="Jane Smith" size="medium" />
			<Avatar name="Alex Johnson" size="large" />
		</div>
	),
};

export const WithImage: Story = {
	render: () => (
		<div style={containerStyle}>
			<Avatar
				src="https://i.pravatar.cc/150?img=32"
				name="Sarah Wilson"
				size="small"
			/>
			<Avatar
				src="https://i.pravatar.cc/150?img=47"
				name="Mike Brown"
				size="medium"
			/>
			<Avatar
				src="https://i.pravatar.cc/150?img=12"
				name="Emma Davis"
				size="large"
			/>
		</div>
	),
};

export const WithStatus: Story = {
	render: () => (
		<div style={containerStyle}>
			<Avatar
				src="https://i.pravatar.cc/150?img=32"
				name="Sarah Wilson"
				size="medium"
				status="online"
			/>
			<Avatar
				src="https://i.pravatar.cc/150?img=47"
				name="Mike Brown"
				size="medium"
				status="busy"
			/>
			<Avatar
				src="https://i.pravatar.cc/150?img=12"
				name="Emma Davis"
				size="medium"
				status="offline"
			/>
		</div>
	),
};

export const FallbackInitials: Story = {
	render: () => (
		<div style={containerStyle}>
			<Avatar name="John Doe" size="small" />
			<Avatar name="Jane Smith" size="medium" />
			<Avatar name="Alex Johnson" size="large" />
		</div>
	),
};

export const DarkMode: Story = {
	render: () => (
		<div style={containerDarkStyle}>
			<Avatar
				src="https://i.pravatar.cc/150?img=32"
				name="Sarah Wilson"
				size="small"
			/>
			<Avatar
				src="https://i.pravatar.cc/150?img=47"
				name="Mike Brown"
				size="medium"
			/>
			<Avatar name="Alex Johnson" size="large" />
			<Avatar
				src="https://i.pravatar.cc/150?img=12"
				name="Emma Davis"
				size="medium"
				status="online"
			/>
		</div>
	),
};
