import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when no handler provided', () => {
    render(<Button label="Click me" />);
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    }).not.toThrow();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} disabled />);

    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
