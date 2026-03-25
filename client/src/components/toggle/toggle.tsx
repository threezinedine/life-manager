import { ReactNode } from 'react';
import Button from '@/components/button/button';
import { Size } from '@/data/props';
import { Variant } from '@/components/button/button.props';

export interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	checkedIcon?: ReactNode;
	uncheckedIcon?: ReactNode;
	size?: Size;
	disabled?: boolean;
	loading?: boolean;
	borderRadius?: Size;
	ariaLabel?: string;
	/** Test ID for e2e testing */
	testId?: string;
}

export default function Toggle({
	checked,
	onChange,
	label,
	checkedIcon,
	uncheckedIcon,
	size,
	disabled = false,
	loading = false,
	borderRadius,
	ariaLabel,
	testId,
}: ToggleProps) {
	const handleClick = () => {
		if (disabled || loading) return;
		onChange(!checked);
	};

	return (
		<Button
			label={label}
			size={size}
			disabled={disabled}
			loading={loading}
			borderRadius={borderRadius}
			variant={Variant.Ghost}
			onClick={handleClick}
			leftIcon={checked ? checkedIcon : uncheckedIcon}
			ariaLabel={ariaLabel}
			testId={testId}
		/>
	);
}
