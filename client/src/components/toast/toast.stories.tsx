import type { Meta, StoryObj } from '@storybook/react';
import Toast from './toast';
import { useToast } from './toast-store';
import { Button } from '@/components/button';
import { Variant } from '@/components/button/button.props';
import ToastItem from './toast-item';
import { ToastVariant } from './toast.props';

const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// HELPERS
// ============================================

function TriggerButtons() {
	const { success, error, warning, info } = useToast();

	return (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			<Button
				label="Success"
				variant={Variant.Success}
				onClick={() => success('Task completed successfully!')}
			/>
			<Button
				label="Error"
				variant={Variant.Danger}
				onClick={() => error('Something went wrong. Please try again.')}
			/>
			<Button
				label="Warning"
				variant={Variant.Warn}
				onClick={() =>
					warning('Please review your input before proceeding.')
				}
			/>
			<Button
				label="Info"
				variant={Variant.Outline}
				onClick={() =>
					info('New update available. Refresh to see changes.')
				}
			/>
		</div>
	);
}

function CustomDurationButtons() {
	const { success, info, warning, error } = useToast();

	return (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			<Button
				label="Short (1s)"
				onClick={() => success('Quick toast!', 1000)}
			/>
			<Button
				label="Medium (3s)"
				onClick={() => info('Default toast!', 3000)}
			/>
			<Button
				label="Long (5s)"
				onClick={() => warning('Long toast!', 5000)}
			/>
			<Button
				label="Persistent (click ✕ to dismiss)"
				variant={Variant.Danger}
				onClick={() => error('Click the ✕ to dismiss!', 0)}
			/>
		</div>
	);
}

// ============================================
// STORIES
// ============================================

export const Default: Story = {
	render: () => (
		<Toast>
			<TriggerButtons />
		</Toast>
	),
};

export const AllVariants: Story = {
	render: () => (
		<Toast>
			<TriggerButtons />
		</Toast>
	),
};

export const CustomDuration: Story = {
	render: () => (
		<Toast>
			<CustomDurationButtons />
		</Toast>
	),
};

// ============================================
// TOAST ITEM VARIANTS (SINGLE STORY)
// ============================================

const toastItems = [
	{
		id: '1',
		message: 'Task completed successfully!',
		variant: ToastVariant.Success,
	},
	{
		id: '2',
		message: 'Something went wrong. Please try again.',
		variant: ToastVariant.Error,
	},
	{
		id: '3',
		message: 'Please review your input before proceeding.',
		variant: ToastVariant.Warning,
	},
	{
		id: '4',
		message: 'New update available. Refresh to see changes.',
		variant: ToastVariant.Info,
	},
];

export const ToastItemVariants: Story = {
	render: () => (
		<div
			style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
			className="light"
		>
			{toastItems.map((item) => (
				<ToastItem
					key={item.id}
					toast={{ ...item, duration: 3000 }}
					onRemove={() => {}}
				/>
			))}
		</div>
	),
};

export const DarkMode: Story = {
	render: () => (
		<div
			className="dark"
			style={{ padding: '1rem', backgroundColor: '#333' }}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.5rem',
				}}
			>
				{toastItems.map((item) => (
					<ToastItem
						key={item.id}
						toast={{ ...item, duration: 3000 }}
						onRemove={() => {}}
					/>
				))}
			</div>
		</div>
	),
};
