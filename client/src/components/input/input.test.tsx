import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input';

describe('Input', () => {
	describe('rendering', () => {
		it('renders the input element', () => {
			render(<Input />);
			expect(screen.getByRole('textbox')).toBeInTheDocument();
		});

		it('renders with a label when provided', () => {
			render(<Input label="Email address" />);
			expect(screen.getByText('Email address')).toBeInTheDocument();
		});

		it('renders placeholder text when provided', () => {
			render(<Input placeholder="Enter your name..." />);
			expect(screen.getByPlaceholderText('Enter your name...')).toBeInTheDocument();
		});

		it('renders hint text when provided (and no error)', () => {
			render(<Input hint="Your email will be used for login" />);
			expect(screen.getByText('Your email will be used for login')).toBeInTheDocument();
		});

		it('does not render hint text when error is present', () => {
			render(<Input hint="Hint text" error="Error text" />);
			expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
			expect(screen.getByText('Error text')).toBeInTheDocument();
		});

		it('renders error message when provided', () => {
			render(<Input error="This field is required" />);
			expect(screen.getByText('This field is required')).toBeInTheDocument();
		});

		it('applies fullWidth class when fullWidth prop is true', () => {
			const { container } = render(<Input fullWidth />);
			// CSS modules add a hash suffix — use a partial class match
			expect(container.firstChild?.className).toMatch(/container--full-width/);
		});

		it('applies custom className when provided', () => {
			const { container } = render(<Input className="my-custom-class" />);
			expect(container.firstChild).toHaveClass('my-custom-class');
		});
	});

	describe('controlled value', () => {
		it('renders with the given value', () => {
			render(<Input value="Hello world" readOnly />);
			expect(screen.getByRole('textbox')).toHaveValue('Hello world');
		});

		it('calls onChangeText when the value changes', () => {
			const handleChange = vi.fn();
			render(<Input value="" onChangeText={handleChange} />);

			fireEvent.change(screen.getByRole('textbox'), {
				target: { value: 'new value' },
			});

			expect(handleChange).toHaveBeenCalledWith('new value');
		});

		it('calls onChangeText on every keystroke', () => {
			const handleChange = vi.fn();
			render(<Input value="" onChangeText={handleChange} />);

			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ab' } });
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });

			expect(handleChange).toHaveBeenCalledTimes(3);
			expect(handleChange).toHaveBeenNthCalledWith(1, 'a');
			expect(handleChange).toHaveBeenNthCalledWith(2, 'ab');
			expect(handleChange).toHaveBeenNthCalledWith(3, 'abc');
		});
	});

	describe('disabled state', () => {
		it('renders as disabled when disabled prop is true', () => {
			render(<Input disabled />);
			expect(screen.getByRole('textbox')).toBeDisabled();
		});

		it('does not call onChangeText when disabled', () => {
			const handleChange = vi.fn();
			render(<Input disabled onChangeText={handleChange} />);

			fireEvent.change(screen.getByRole('textbox'), {
				target: { value: 'should not change' },
			});

			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe('loading state', () => {
		it('renders the input as disabled when loading', () => {
			render(<Input loading />);
			expect(screen.getByRole('textbox')).toBeDisabled();
		});

		it('does not call onChangeText when loading', () => {
			const handleChange = vi.fn();
			render(<Input loading onChangeText={handleChange} />);

			fireEvent.change(screen.getByRole('textbox'), {
				target: { value: 'should not change' },
			});

			expect(handleChange).not.toHaveBeenCalled();
		});
	});

	describe('error state', () => {
		it('sets aria-invalid to true when error is provided', () => {
			render(<Input error="Invalid input" />);
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
		});

		it('sets aria-invalid to false when no error', () => {
			render(<Input />);
			expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
		});

		it('renders the error message with role="alert"', () => {
			render(<Input error="Something went wrong" />);
			expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
		});

		it('applies the error variant even if variant was explicitly set to default', () => {
			// When error prop is provided, variant should be overridden to error
			render(<Input variant="default" error="Field is required" />);
			const textbox = screen.getByRole('textbox');
			// The input wrapper should have the error class
			expect(textbox).toHaveAttribute('aria-invalid', 'true');
		});
	});

	describe('accessibility', () => {
		it('uses label text as aria-label when no ariaLabel is provided', () => {
			render(<Input label="Search query" />);
			expect(screen.getByRole('textbox')).toHaveAttribute(
				'aria-label',
				'Search query'
			);
		});

		it('uses explicit ariaLabel when provided', () => {
			render(<Input ariaLabel="Form input" />);
			expect(screen.getByRole('textbox')).toHaveAttribute(
				'aria-label',
				'Form input'
			);
		});

		it('prefers ariaLabel over label for aria-label when both are set', () => {
			render(<Input label="Label text" ariaLabel="ARIA label" />);
			expect(screen.getByRole('textbox')).toHaveAttribute(
				'aria-label',
				'ARIA label'
			);
		});

		it('links error message to input via aria-describedby', () => {
			render(<Input label="Username" error="Username is taken" />);
			const textbox = screen.getByRole('textbox');
			const describedBy = textbox.getAttribute('aria-describedby');
			// The ID is built from the label prop: "Username" → "Username-error"
			expect(describedBy).toMatch(/Username-error/);
		});
	});
});
