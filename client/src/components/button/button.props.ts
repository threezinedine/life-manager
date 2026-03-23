import { ReactNode } from 'react';
import { Size } from '@/data/props';

export enum Variant {
	Primary = 'primary',
	Secondary = 'secondary',
	Tertiary = 'tertiary',
	Warn = 'warn',
	Ghost = 'ghost',
	Danger = 'danger',
	Success = 'success',
	Outline = 'outline',
}

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
