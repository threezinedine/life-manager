import { useThemeStore } from '../../store/theme.store';
import Toggle from '@/components/toggle/toggle';
import { SunIcon, MoonIcon } from '@/icons';
import { Size } from '@/data/props';

export default function ThemeToggle() {
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<Toggle
			checked={theme === 'dark'}
			onChange={toggleTheme}
			checkedIcon={<MoonIcon />}
			uncheckedIcon={<SunIcon />}
			size={Size.Small}
			aria-label="Toggle theme"
		/>
	);
}
