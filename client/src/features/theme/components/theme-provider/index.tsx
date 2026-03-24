import { useEffect } from 'react';
import { useThemeStore } from '../../store/theme.store';

interface ThemeProviderProps {
	children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
	}, [theme]);

	return <>{children}</>;
}
