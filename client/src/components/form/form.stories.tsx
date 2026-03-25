import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/button';
import { Variant } from '@/components/button/button.props';
import { Form } from '@/components/form';
import type { FormHandle } from '@/components/form/form.props';

const meta: Meta<typeof Form> = {
	title: 'Components/Form',
	component: Form,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		loading: { control: 'boolean' },
		fullWidth: { control: 'boolean' },
	},
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		fields: [
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'you@example.com',
			},
			{
				name: 'password',
				label: 'Password',
				type: 'password',
				placeholder: '••••••••',
			},
		],
		onSubmit: (values) => console.log('Form submitted:', values),
		submitLabel: 'Sign in',
		fullWidth: true,
	},
};

export const WithValidation: Story = {
	render: () => {
		return (
			<div
				style={{
					width: 360,
					padding: '1.5rem',
					background: 'var(--color-bg)',
					borderRadius: '1rem',
					boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
				}}
			>
				<Form
					fields={[
						{
							name: 'username',
							label: 'Username',
							placeholder: 'john_doe',
							required: true,
							hint: '3–20 characters, letters and numbers only',
							validator: (v: string) =>
								/^[a-zA-Z0-9]{3,20}$/.test(v)
									? null
									: 'Must be 3–20 alphanumeric characters',
						},
						{
							name: 'email',
							label: 'Email',
							type: 'email',
							placeholder: 'you@example.com',
							required: true,
							validator: (v: string) =>
								/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
									? null
									: 'Enter a valid email address',
						},
						{
							name: 'password',
							label: 'Password',
							type: 'password',
							placeholder: '••••••••',
							required: true,
							validator: (v: string) =>
								v.length >= 8
									? null
									: 'Password must be at least 8 characters',
						},
					]}
					onSubmit={(values) => console.log(values)}
					submitLabel="Create account"
					fullWidth
				/>
			</div>
		);
	},
};

export const Loading: Story = {
	render: () => (
		<div
			style={{
				width: 360,
				padding: '1.5rem',
				background: 'var(--color-bg)',
				borderRadius: '1rem',
			}}
		>
			<Form
				fields={[
					{ name: 'email', label: 'Email', type: 'email' },
					{ name: 'password', label: 'Password', type: 'password' },
				]}
				onSubmit={(values) => console.log(values)}
				submitLabel="Sign in"
				loading
				fullWidth
			/>
		</div>
	),
};

Loading.parameters = {
	docs: {
		description: {
			story: 'All fields and the submit button are disabled while `loading` is true.',
		},
	},
};

export const CustomSubmit: Story = {
	render: () => {
		const formRef = useRef<FormHandle>(null);

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.75rem',
					width: 360,
					padding: '1.5rem',
					background: 'var(--color-bg)',
					borderRadius: '1rem',
					boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
				}}
			>
				<Form
					ref={formRef}
					fields={[
						{
							name: 'email',
							label: 'Email',
							type: 'email',
							placeholder: 'you@example.com',
						},
						{
							name: 'password',
							label: 'Password',
							type: 'password',
							placeholder: '••••••••',
						},
					]}
					onSubmit={(values) => console.log(values)}
					showSubmit={false}
					fullWidth
				/>
				<Button
					label="Sign in"
					variant={Variant.Primary}
					onClick={() => formRef.current?.submit()}
					fullWidth
				/>
			</div>
		);
	},
};
