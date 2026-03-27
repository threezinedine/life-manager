import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, type ModalRef } from './modal';
import Button from '@/components/button';
import { Variant } from '@/components/button/button.props';
import { Size } from '@/data/props';

const meta: Meta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
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
	background: '#1f29337',
};

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<div style={containerStyle}>
				<Button
					label="Open Modal"
					variant={Variant.Primary}
					onClick={() => setOpen(true)}
				/>
				<Modal
					open={open}
					title="Modal Title"
					onClose={() => setOpen(false)}
				>
					This is the modal content. Pass any React node as children.
				</Modal>
			</div>
		);
	},
};

export const WithActions: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<div style={containerStyle}>
				<Button
					label="Open Modal"
					variant={Variant.Primary}
					onClick={() => setOpen(true)}
				/>
				<Modal
					open={open}
					title="Confirm Action"
					onClose={() => setOpen(false)}
					actions={
						<Button
							label="Cancel"
							variant={Variant.Tertiary}
							size={Size.Small}
							onClick={() => setOpen(false)}
						/>
					}
				>
					Are you sure you want to proceed? This action cannot be undone.
				</Modal>
			</div>
		);
	},
};

export const WithMultipleActions: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<div style={containerStyle}>
				<Button
					label="Open Modal"
					variant={Variant.Primary}
					onClick={() => setOpen(true)}
				/>
				<Modal
					open={open}
					title="Save Changes"
					onClose={() => setOpen(false)}
					actions={
						<>
							<Button
								label="Discard"
								variant={Variant.Tertiary}
								size={Size.Small}
								onClick={() => setOpen(false)}
							/>
							<Button
								label="Save"
								variant={Variant.Primary}
								size={Size.Small}
								onClick={() => setOpen(false)}
							/>
						</>
					}
				>
					You have unsaved changes. Would you like to save them before leaving?
				</Modal>
			</div>
		);
	},
};

export const CloseOnBackdropDisabled: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<div style={containerStyle}>
				<Button
					label="Open Modal (no backdrop close)"
					variant={Variant.Warn}
					onClick={() => setOpen(true)}
				/>
				<Modal
					open={open}
					title="Close Using the Button"
					onClose={() => setOpen(false)}
					closeOnBackdrop={false}
				>
					Clicking the backdrop will not close this modal. You must use the X
					button.
				</Modal>
			</div>
		);
	},
};

export const DarkMode: Story = {
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<div className="dark" style={containerDarkStyle}>
				<Button
					label="Open Modal"
					variant={Variant.Primary}
					onClick={() => setOpen(true)}
				/>
				<Modal
					open={open}
					title="Dark Mode Modal"
					onClose={() => setOpen(false)}
					actions={
						<Button
							label="Got it"
							variant={Variant.Primary}
							size={Size.Small}
							onClick={() => setOpen(false)}
						/>
					}
				>
					This modal renders correctly in dark mode with full CSS variable
					theming.
				</Modal>
			</div>
		);
	},
};

export const ProgrammaticControl: Story = {
	render: () => {
		const modalRef = useRef<ModalRef>(null);
		const [open, setOpen] = useState(false);

		return (
			<div style={containerStyle}>
				<Modal
					ref={modalRef}
					open={open}
					title="Programmatic Modal"
					onClose={() => setOpen(false)}
					actions={
						<>
							<Button
								label="Cancel"
								variant={Variant.Tertiary}
								size={Size.Small}
								onClick={() => modalRef.current?.close()}
							/>
							<Button
								label="Confirm"
								variant={Variant.Success}
								size={Size.Small}
								onClick={() => modalRef.current?.close()}
							/>
						</>
					}
				>
					Use the ref to imperatively close this modal from any child action,
					without prop drilling.
				</Modal>
				<Button
					label="Open Modal"
					variant={Variant.Primary}
					onClick={() => setOpen(true)}
				/>
			</div>
		);
	},
};
