import { useEffect } from 'react';
import { useThemeStore } from '../../store/theme.store';

interface ThemeProviderProps {
	children: React.ReactNode;
}

const STORAGE_KEY = 'theme';

// Apply the persisted theme class to <html> synchronously before first paint.
function bootstrapTheme(theme: string) {
	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(theme);
}

// Read the persisted value directly — this is synchronous so it
// runs before the component renders, preventing a flash of wrong theme.
const storedTheme = localStorage.getItem(STORAGE_KEY) as string | null;
if (storedTheme === 'light' || storedTheme === 'dark') {
	bootstrapTheme(storedTheme);
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		bootstrapTheme(theme);
	}, [theme]);

	return <>{children}</>;
}
