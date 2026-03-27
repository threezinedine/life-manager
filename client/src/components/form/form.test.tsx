import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Form from './form';
import type { FormHandle } from './form.props';

const FIELDS = [
	{ name: 'email', label: 'Email', type: 'email' as const },
	{ name: 'password', label: 'Password', type: 'password' as const },
];

describe('Form', () => {
	describe('rendering', () => {
		it('renders an input for each field', () => {
			render(<Form fields={FIELDS} onSubmit={vi.fn()} />);
			// Use getAllLabels to query all inputs (password type is not counted as textbox role)
			expect(screen.getAllByLabelText(/email|password/i)).toHaveLength(2);
		});

		it('renders the submit button with default label', () => {
			render(<Form fields={FIELDS} onSubmit={vi.fn()} />);
			expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
		});

		it('renders the submit button with custom label', () => {
			render(<Form fields={FIELDS} onSubmit={vi.fn()} submitLabel="Sign in" />);
			expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
		});

		it('applies custom className to the form element', () => {
			const { container } = render(
				<Form fields={FIELDS} onSubmit={vi.fn()} className="my-form" />,
			);
			expect(container.firstChild).toHaveClass('my-form');
		});
	});

	describe('validation on submit', () => {
		it('calls onSubmit with all field values when all fields are valid', () => {
			const onSubmit = vi.fn();
			render(<Form fields={FIELDS} onSubmit={onSubmit} />);

			fireEvent.change(screen.getByLabelText(/email/i), {
				target: { value: 'test@example.com' },
			});
			fireEvent.change(screen.getByLabelText(/password/i), {
				target: { value: 'secret123' },
			});
			fireEvent.click(screen.getByRole('button', { name: /submit/i }));

			expect(onSubmit).toHaveBeenCalledOnce();
			expect(onSubmit).toHaveBeenCalledWith({
				email: 'test@example.com',
				password: 'secret123',
			});
		});

		it('does NOT call onSubmit when a required field is empty (errors are shown)', () => {
			const onSubmit = vi.fn();
			render(
				<Form
					fields={[{ name: 'username', label: 'Username', required: true }]}
					onSubmit={onSubmit}
				/>,
			);

			fireEvent.click(screen.getByRole('button', { name: /submit/i }));

			expect(onSubmit).not.toHaveBeenCalled();
			expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
		});

		it('shows a required error message when a required field is empty on submit', () => {
			render(
				<Form
					fields={[{ name: 'username', label: 'Username', required: true }]}
					onSubmit={vi.fn()}
				/>,
			);

			fireEvent.click(screen.getByRole('button', { name: /submit/i }));

			expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
		});

		it('does NOT call onSubmit when a custom validator fails (errors are shown)', () => {
			const onSubmit = vi.fn();
			render(
				<Form
					fields={[
						{
							name: 'password',
							label: 'Password',
							validator: (v: string) => (v.length < 8 ? 'Password must be at least 8 characters' : null),
						},
					]}
					onSubmit={onSubmit}
				/>,
			);

			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'short' } });
			fireEvent.click(screen.getByRole('button', { name: /submit/i }));

			expect(onSubmit).not.toHaveBeenCalled();
			expect(screen.getByRole('alert')).toHaveTextContent('Password must be at least 8 characters');
		});

		it('calls onSubmit when custom validator passes', () => {
			const onSubmit = vi.fn();
			render(
				<Form
					fields={[
						{
							name: 'password',
							label: 'Password',
							validator: (v: string) => (v.length < 8 ? 'Too short' : null),
						},
					]}
					onSubmit={onSubmit}
				/>,
			);

			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'longenoughpass' } });
			fireEvent.click(screen.getByRole('button', { name: /submit/i }));

			expect(onSubmit).toHaveBeenCalledOnce();
		});
	});

	describe('live validation', () => {
		it('shows a required error on initial render for an empty required field', () => {
			render(
				<Form
					fields={[{ name: 'username', label: 'Username', required: true }]}
					onSubmit={vi.fn()}
				/>,
			);

			// Errors are always visible — no need to blur or submit first
			expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
		});

		it('shows a custom validator error immediately on change', () => {
			render(
				<Form
					fields={[
						{
							name: 'age',
							label: 'Age',
							validator: (v: string) => (isNaN(Number(v)) ? 'Must be a number' : null),
						},
					]}
					onSubmit={vi.fn()}
				/>,
			);

			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'not-a-number' } });

			expect(screen.getByRole('alert')).toHaveTextContent('Must be a number');
		});

		it('clears the error as soon as the user fixes the field', () => {
			render(
				<Form
					fields={[{ name: 'username', label: 'Username', required: true }]}
					onSubmit={vi.fn()}
				/>,
			);

			expect(screen.getByRole('alert')).toHaveTextContent('This field is required');

			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		});
	});

	describe('loading state', () => {
		it('disables the submit button when loading', () => {
			render(<Form fields={FIELDS} onSubmit={vi.fn()} loading />);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('prevents form submission when loading', () => {
			const onSubmit = vi.fn();
			render(<Form fields={FIELDS} onSubmit={onSubmit} loading />);

			fireEvent.click(screen.getByRole('button'));

			expect(onSubmit).not.toHaveBeenCalled();
		});
	});

	describe('hint display', () => {
		it('renders hint text for a field with no error', () => {
			render(
				<Form
					fields={[{ name: 'email', label: 'Email', hint: 'We will never share this' }]}
					onSubmit={vi.fn()}
				/>,
			);
			expect(screen.getByText('We will never share this')).toBeInTheDocument();
		});

		it('hides hint text when field has an error', () => {
			render(
				<Form
					fields={[
						{
							name: 'email',
							label: 'Email',
							hint: 'Hint text',
							required: true,
						},
					]}
					onSubmit={vi.fn()}
				/>,
			);

			// Error shows on mount for required fields; hint should be hidden
			expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
			expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
		});
	});

	describe('showSubmit', () => {
		it('hides the submit button when showSubmit is false', () => {
			render(<Form fields={FIELDS} onSubmit={vi.fn()} showSubmit={false} />);
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});

		it('renders the submit button when showSubmit is true', () => {
			render(<Form fields={FIELDS} onSubmit={vi.fn()} showSubmit={true} />);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});
	});

	describe('formRef', () => {
		it('calls ref.submit() to trigger submission', async () => {
			const onSubmit = vi.fn();
			const ref = React.createRef<FormHandle>();

			render(<Form ref={ref} fields={FIELDS} onSubmit={onSubmit} />);

			await waitFor(() => {
				ref.current!.submit();
			});

			expect(onSubmit).toHaveBeenCalledOnce();
			expect(onSubmit).toHaveBeenCalledWith({ email: '', password: '' });
		});

		it('returns current values from ref.getValues()', async () => {
			const ref = React.createRef<FormHandle>();

			render(<Form ref={ref} fields={FIELDS} onSubmit={vi.fn()} />);

			await waitFor(() => {
				fireEvent.change(screen.getByLabelText(/email/i), {
					target: { value: 'test@example.com' },
				});
			});

			await waitFor(() => {
				expect(ref.current!.getValues()).toEqual({ email: 'test@example.com', password: '' });
			});
		});
	});
});
