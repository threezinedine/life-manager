import { ReactNode } from 'react';
import { Size, Variant } from '@/data/props';

export interface ButtonProps {
	label?: string;
	size?: Size;
	variant?: Variant;
	borderRadius?: Size;
	onClick?: () => void;
	disabled?: boolean;
	loading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}
