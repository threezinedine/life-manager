import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';
import { Size, Variant } from '@/data/props';

// ============================================
// SVG ICONS
// ============================================

const PlusIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);

const ArrowRightIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

const TrashIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
		<path d="M10 11v6M14 11v6" />
		<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
	</svg>
);

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

export const IconLayouts: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			{/* Left icon + text */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				<span
					style={{
						minWidth: 140,
						fontSize: '0.875rem',
						color: '#6b7280',
					}}
				>
					Left Icon
				</span>
				<Button label="Add Item" leftIcon={<PlusIcon />} />
				<Button
					label="Add Item"
					variant={Variant.Secondary}
					leftIcon={<PlusIcon />}
				/>
				<Button
					label="Add Item"
					variant={Variant.Ghost}
					leftIcon={<PlusIcon />}
				/>
			</div>

			{/* Icon only */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				<span
					style={{
						minWidth: 140,
						fontSize: '0.875rem',
						color: '#6b7280',
					}}
				>
					Icon Only
				</span>
				<Button leftIcon={<TrashIcon />} aria-label="Delete" />
				<Button
					variant={Variant.Secondary}
					leftIcon={<TrashIcon />}
					aria-label="Delete"
				/>
				<Button
					variant={Variant.Ghost}
					leftIcon={<TrashIcon />}
					aria-label="Delete"
				/>
			</div>

			{/* Text only */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				<span
					style={{
						minWidth: 140,
						fontSize: '0.875rem',
						color: '#6b7280',
					}}
				>
					Text Only
				</span>
				<Button label="Submit" />
				<Button label="Submit" variant={Variant.Secondary} />
				<Button label="Submit" variant={Variant.Ghost} />
			</div>

			{/* Text + right icon */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				<span
					style={{
						minWidth: 140,
						fontSize: '0.875rem',
						color: '#6b7280',
					}}
				>
					Right Icon
				</span>
				<Button label="Continue" rightIcon={<ArrowRightIcon />} />
				<Button
					label="Continue"
					variant={Variant.Secondary}
					rightIcon={<ArrowRightIcon />}
				/>
				<Button
					label="Continue"
					variant={Variant.Ghost}
					rightIcon={<ArrowRightIcon />}
				/>
			</div>

			{/* Left icon + text + right icon */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				<span
					style={{
						minWidth: 140,
						fontSize: '0.875rem',
						color: '#6b7280',
					}}
				>
					Both Icons
				</span>
				<Button
					label="Add to Cart"
					leftIcon={<PlusIcon />}
					rightIcon={<ArrowRightIcon />}
				/>
				<Button
					label="Add to Cart"
					variant={Variant.Secondary}
					leftIcon={<PlusIcon />}
					rightIcon={<ArrowRightIcon />}
				/>
				<Button
					label="Add to Cart"
					variant={Variant.Ghost}
					leftIcon={<PlusIcon />}
					rightIcon={<ArrowRightIcon />}
				/>
			</div>
		</div>
	),
};
