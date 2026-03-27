import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, type ModalRef } from './modal';

describe('Modal', () => {
	beforeEach(() => {
		cleanup();
		document.body.style.overflow = '';
	});

	it('renders nothing when closed', () => {
		render(
			<Modal
				open={false}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('renders the dialog when open', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('renders the title in the header', () => {
		render(
			<Modal
				open={true}
				title="My Modal Title"
				onClose={vi.fn()}
			/>
		);
		expect(
			screen.getByRole('heading', { name: 'My Modal Title' })
		).toBeInTheDocument();
	});

	it('renders custom children in the content slot', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			>
				<p>Custom content</p>
			</Modal>
		);
		expect(screen.getByText('Custom content')).toBeInTheDocument();
	});

	it('does not render content slot when no children provided', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);
		expect(screen.queryByText('Custom content')).not.toBeInTheDocument();
	});

	it('renders actions when provided', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
				actions={<button>Confirm</button>}
			>
				<p>Content</p>
			</Modal>
		);
		expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
	});

	it('does not render actions slot when not provided', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			>
				<p>Content</p>
			</Modal>
		);
		expect(
			screen.queryByRole('button', { name: 'Confirm' })
		).not.toBeInTheDocument();
	});

	it('renders the close button with correct aria-label', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);
		expect(
			screen.getByRole('button', { name: 'Close modal' })
		).toBeInTheDocument();
	});

	it('calls onClose when close button is clicked', async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={onClose}
			/>
		);

		await user.click(screen.getByRole('button', { name: 'Close modal' }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('calls onClose when backdrop is clicked', async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={onClose}
			/>
		);

		const backdrop = screen.getByRole('presentation');
		await user.click(backdrop);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not call onClose when clicking the dialog itself', async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={onClose}
			/>
		);

		await user.click(screen.getByRole('dialog'));
		expect(onClose).not.toHaveBeenCalled();
	});

	it('does not call onClose when backdrop is clicked and closeOnBackdrop is false', async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={onClose}
				closeOnBackdrop={false}
			/>
		);

		const backdrop = screen.getByRole('presentation');
		await user.click(backdrop);
		expect(onClose).not.toHaveBeenCalled();
	});

	it('calls onClose when Escape is pressed', async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={onClose}
			/>
		);

		await user.keyboard('{Escape}');
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('locks body scroll when open', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);

		expect(document.body.style.overflow).toBe('hidden');
	});

	it('restores body scroll when closed', async () => {
		const { rerender } = render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);

		expect(document.body.style.overflow).toBe('hidden');

		rerender(
			<Modal
				open={false}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);

		await waitFor(() => {
			expect(document.body.style.overflow).toBe('');
		});
	});

	it('closes via ref close() method', async () => {
		const modalRef = React.createRef<ModalRef>();
		const onClose = vi.fn();
		render(
			<Modal
				ref={modalRef}
				open={true}
				title="Modal Title"
				onClose={onClose}
			/>
		);

		expect(screen.getByRole('dialog')).toBeInTheDocument();

		act(() => {
			modalRef.current?.close();
		});

		await waitFor(() => {
			expect(onClose).toHaveBeenCalledTimes(1);
		});
	});

	it('warns when open() is called on a controlled modal', async () => {
		const consoleWarn = vi
			.spyOn(console, 'warn')
			.mockImplementation(() => {});
		const modalRef = React.createRef<ModalRef>();
		render(
			<Modal
				ref={modalRef}
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);

		act(() => {
			modalRef.current?.open();
		});

		await waitFor(() => {
			expect(consoleWarn).toHaveBeenCalledWith(
				expect.stringContaining(
					'[Modal] open() has no effect on a controlled Modal'
				)
			);
		});

		consoleWarn.mockRestore();
	});

	it('uses custom testId on the dialog', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
				testId="my-modal"
			/>
		);

		expect(screen.getByTestId('my-modal')).toBeInTheDocument();
	});

	it('uses custom testId on the close button', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
				testId="my-modal"
			/>
		);

		expect(screen.getByTestId('my-modal-close')).toBeInTheDocument();
	});

	it('uses default testId on the close button when no custom testId provided', () => {
		render(
			<Modal
				open={true}
				title="Modal Title"
				onClose={vi.fn()}
			/>
		);

		expect(screen.getByTestId('modal-close')).toBeInTheDocument();
	});

	it('applies aria-modal and aria-labelledby attributes', () => {
		render(
			<Modal
				open={true}
				title="My Modal"
				onClose={vi.fn()}
			/>
		);

		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
		expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
	});
});
