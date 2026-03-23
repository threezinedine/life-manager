import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from './toggle';

describe('Toggle', () => {
	it('renders unchecked state with uncheckedIcon', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} uncheckedIcon={<span>🌞</span>} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders checked state with checkedIcon', () => {
		const onChange = vi.fn();
		render(<Toggle checked={true} onChange={onChange} checkedIcon={<span>🌙</span>} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('calls onChange with true when clicked while unchecked', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} />);
		fireEvent.click(screen.getByRole('button'));
		expect(onChange).toHaveBeenCalledWith(true);
	});

	it('calls onChange with false when clicked while checked', () => {
		const onChange = vi.fn();
		render(<Toggle checked={true} onChange={onChange} />);
		fireEvent.click(screen.getByRole('button'));
		expect(onChange).toHaveBeenCalledWith(false);
	});

	it('does not call onChange when disabled', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} disabled />);
		fireEvent.click(screen.getByRole('button'));
		expect(onChange).not.toHaveBeenCalled();
	});

	it('does not call onChange when loading', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} loading />);
		fireEvent.click(screen.getByRole('button'));
		expect(onChange).not.toHaveBeenCalled();
	});

	it('renders with a label when provided', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} label="Toggle me" />);
		expect(screen.getByRole('button', { name: 'Toggle me' })).toBeInTheDocument();
	});

	it('renders the button as disabled when disabled prop is true', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} disabled />);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('renders in loading state when loading prop is true', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} loading />);
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('calls onChange only once per click (no double-firing)', () => {
		const onChange = vi.fn();
		render(<Toggle checked={false} onChange={onChange} />);
		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByRole('button'));
		expect(onChange).toHaveBeenCalledTimes(2);
	});
});
