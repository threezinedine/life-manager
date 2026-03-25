import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/features/theme';
import { LanguageProvider } from '@/features/language';

export default function RootLayout() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<div id="app-root">
					<Outlet />
				</div>
			</LanguageProvider>
		</ThemeProvider>
	);
}
