import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/features/theme';

export default function RootLayout() {
	return (
		<ThemeProvider>
			<div id="app-root">
				<Outlet />
			</div>
		</ThemeProvider>
	);
}
