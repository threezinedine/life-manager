import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';
import { Size, Variant } from '@/data/props';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		onClick: { action: 'clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Click me',
	},
};

export const WithClickHandler: Story = {
	args: {
		label: 'Click me',
		onClick: () => alert('Button clicked!'),
	},
};

export const Disabled: Story = {
	args: {
		label: 'Click me',
		disabled: true,
		onClick: () => alert('This should not trigger!'),
	},
};

export const Loading: Story = {
	args: {
		label: 'Loading...',
		loading: true,
	},
};

export const AllSizes: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '16px',
				flexWrap: 'wrap',
			}}
		>
			<Button label="Small" size={Size.Small} />
			<Button label="Medium" size={Size.Medium} />
			<Button label="Large" size={Size.Large} />
			<Button label="Full Width" size={Size.FullWidth} />
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '16px',
				flexWrap: 'wrap',
			}}
		>
			<Button label="Primary" variant={Variant.Primary} />
			<Button label="Secondary" variant={Variant.Secondary} />
			<Button label="Tertiary" variant={Variant.Tertiary} />
			<Button label="Warn" variant={Variant.Warn} />
			<Button label="Ghost" variant={Variant.Ghost} />
			<Button label="Danger" variant={Variant.Danger} />
			<Button label="Success" variant={Variant.Success} />
			<Button label="Outline" variant={Variant.Outline} />
		</div>
	),
};

export const DarkThemeVariants: Story = {
	render: () => (
		<div
			className="dark"
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '16px',
				backgroundColor: '#333',
				flexWrap: 'wrap',
				padding: '16px',
			}}
		>
			<Button label="Primary" variant={Variant.Primary} />
			<Button label="Secondary" variant={Variant.Secondary} />
			<Button label="Tertiary" variant={Variant.Tertiary} />
			<Button label="Warn" variant={Variant.Warn} />
			<Button label="Ghost" variant={Variant.Ghost} />
			<Button label="Danger" variant={Variant.Danger} />
			<Button label="Success" variant={Variant.Success} />
			<Button label="Outline" variant={Variant.Outline} />
		</div>
	),
};

export const AllBorderRadii: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '16px',
				flexWrap: 'wrap',
			}}
		>
			<Button label="Small" borderRadius={Size.Small} />
			<Button label="Medium" borderRadius={Size.Medium} />
			<Button label="Large" borderRadius={Size.Large} />
		</div>
	),
};
