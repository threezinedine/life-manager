import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useToast } from './toast-store';
import { useToastStore } from './toast-store';
import Toast from './toast';
import { ReactNode } from 'react';

function ToastTestWrapper({ children }: { children: ReactNode }) {
	return <Toast>{children}</Toast>;
}

function TriggerButton() {
	const { success, error, warning, info } = useToast();

	return (
		<div>
			<button onClick={() => success('Success message')}>
				Show Success
			</button>
			<button onClick={() => error('Error message')}>Show Error</button>
			<button onClick={() => warning('Warning message')}>
				Show Warning
			</button>
			<button onClick={() => info('Info message')}>Show Info</button>
		</div>
	);
}

function CustomDurationTrigger() {
	const { success } = useToast();

	return (
		<button onClick={() => success('Custom duration', 5000)}>
			Show Custom Duration
		</button>
	);
}

describe('Toast', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		useToastStore.getState().reset();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders children without crashing', () => {
		render(
			<ToastTestWrapper>
				<div>Test Content</div>
			</ToastTestWrapper>
		);
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('renders toast container in the DOM', () => {
		render(
			<ToastTestWrapper>
				<div>Test Content</div>
			</ToastTestWrapper>
		);
		expect(
			document.querySelector('[aria-live="polite"]')
		).toBeInTheDocument();
	});

	it('shows success toast with correct message', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Success'));

		expect(screen.getByText('Success message')).toBeInTheDocument();
	});

	it('shows error toast with correct message', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Error'));

		expect(screen.getByText('Error message')).toBeInTheDocument();
	});

	it('shows warning toast with correct message', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Warning'));

		expect(screen.getByText('Warning message')).toBeInTheDocument();
	});

	it('shows info toast with correct message', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Info'));

		expect(screen.getByText('Info message')).toBeInTheDocument();
	});

	it('allows closing toast by clicking close button', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Success'));
		expect(screen.getByText('Success message')).toBeInTheDocument();

		const closeButton = screen.getByRole('button', { name: 'Close' });
		fireEvent.click(closeButton);

		expect(screen.queryByText('Success message')).not.toBeInTheDocument();
	});

	it('displays correct icon for success variant', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Success'));
		const toastItem = document.querySelector('[role="alert"]');
		expect(toastItem?.textContent).toContain('✓');
	});

	it('displays correct icon for error variant', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Error'));
		const toastItem = document.querySelector('[role="alert"]');
		expect(toastItem?.textContent).toContain('✕');
	});

	it('displays correct icon for warning variant', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Warning'));
		const toastItem = document.querySelector('[role="alert"]');
		expect(toastItem?.textContent).toContain('⚠');
	});

	it('displays correct icon for info variant', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Info'));
		const toastItem = document.querySelector('[role="alert"]');
		expect(toastItem?.textContent).toContain('ℹ');
	});

	it('auto-removes toast after default duration', () => {
		render(
			<ToastTestWrapper>
				<TriggerButton />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Success'));
		expect(screen.getByText('Success message')).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect(screen.queryByText('Success message')).not.toBeInTheDocument();
	});

	it('auto-removes toast after custom duration', () => {
		render(
			<ToastTestWrapper>
				<CustomDurationTrigger />
			</ToastTestWrapper>
		);

		fireEvent.click(screen.getByText('Show Custom Duration'));
		expect(screen.getByText('Custom duration')).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(5000);
		});

		expect(screen.queryByText('Custom duration')).not.toBeInTheDocument();
	});
});
