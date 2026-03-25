import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/features/theme';
import { LanguageProvider } from '@/features/language';
import Navbar from '@/features/navbar';
import styles from './common.module.scss';
import { useThemeStore } from '@/features/theme';
import clsx from 'clsx';

export default function CommonLayout() {
	const { theme } = useThemeStore();

	return (
		<ThemeProvider>
			<LanguageProvider>
				<div
					className={clsx(styles.layout, {
						dark: theme === 'dark',
					})}
				>
					<Navbar />
					<main className={styles.main}>
						<Outlet />
					</main>
				</div>
			</LanguageProvider>
		</ThemeProvider>
	);
}
