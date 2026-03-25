import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './input';
import { Size } from '@/data/props';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		variant: {
			control: 'select',
			options: ['default', 'error'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
	},
};

export const WithHint: Story = {
	args: {
		label: 'Email',
		placeholder: 'you@example.com',
		hint: "We'll never share your email with anyone.",
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		placeholder: 'you@example.com',
		value: 'not-an-email',
		error: 'Please enter a valid email address.',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled field',
		placeholder: 'You cannot edit this',
		value: 'Locked value',
		disabled: true,
	},
};

export const Loading: Story = {
	args: {
		label: 'Checking availability...',
		placeholder: 'Loading...',
		loading: true,
	},
};

// ============================================
// INTERACTIVE FORM STORY
// ============================================

export const InteractiveLoginForm: Story = {
	render: () => {
		const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
		const [emailError, setEmailError] = useState('');

		const validateEmail = (value: string) => {
			if (!value) {
				setEmailError('Email is required');
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				setEmailError('Please enter a valid email');
			} else {
				setEmailError('');
			}
		};

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1.25rem',
					width: 360,
					padding: '1.5rem',
					background: 'var(--color-bg)',
					borderRadius: '1rem',
					boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
				}}
			>
				<h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
					Sign in
				</h2>

				<Input
					label="Email"
					placeholder="you@example.com"
					value={email}
					onChangeText={(val) => {
						setEmail(val);
						if (emailError) validateEmail(val);
					}}
					onBlur={() => validateEmail(email)}
					error={emailError}
					fullWidth
				/>

				<Input
					label="Password"
					placeholder="••••••••"
					type="password"
					value={password}
					onChangeText={setPassword}
					fullWidth
				/>

				<button
					type="button"
					style={{
						padding: '0.75rem',
						background: email && password ? '#6366f1' : '#9ca3af',
						color: '#fff',
						border: 'none',
						borderRadius: '0.5rem',
						fontWeight: 600,
						cursor: email && password ? 'pointer' : 'not-allowed',
						transition: 'background 0.2s ease',
					}}
				>
					Sign in
				</button>
			</div>
		);
	},
};

// ============================================
// SIZE PREVIEW
// ============================================

export const AllSizes: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1.25rem',
				width: 360,
			}}
		>
			<Input label="Small" placeholder="Small size input" size={Size.Small} fullWidth />
			<Input label="Medium" placeholder="Medium size input" size={Size.Medium} fullWidth />
			<Input label="Large" placeholder="Large size input" size={Size.Large} fullWidth />
		</div>
	),
};

// ============================================
// DARK THEME
// ============================================

export const DarkTheme: Story = {
	parameters: {
		backgrounds: { default: 'dark' },
	},
	render: () => (
		<div
			className="dark"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1.25rem',
				width: 360,
				padding: '1.5rem',
				background: '#1f2937',
				borderRadius: '1rem',
			}}
		>
			<Input
				label="Email"
				placeholder="you@example.com"
				defaultValue="alex@darkmode.io"
				fullWidth
			/>
			<Input
				label="With error"
				placeholder="Type something..."
				defaultValue="bad input"
				error="This value is invalid in dark mode"
				fullWidth
			/>
			<Input
				label="Disabled"
				placeholder="Cannot edit"
				defaultValue="Frozen value"
				disabled
				fullWidth
			/>
		</div>
	),
};
