import styles from './navbar.module.scss';
import clsx from 'clsx';
import LanguageSelector from '@/features/language/components/language-selector';
import { ThemeToggle } from '@/features/theme';

export interface NavbarProps {
	logo: React.ReactNode;
	branch: string;
	authPart?: React.ReactNode;
	className?: string;
}

export default function Navbar({
	logo,
	branch,
	authPart,
	className,
}: NavbarProps) {
	return (
		<nav className={clsx(styles.navbar, className)} data-testid="navbar">
			<div className={styles.container}>
				<div className={styles.left}>
					{logo && <span className={styles.logo} data-testid="navbar-logo">{logo}</span>}
					{branch && <span className={styles.branch}>{branch}</span>}
				</div>
				<div className={styles.right} data-testid="navbar-right">
					<LanguageSelector />
					<ThemeToggle />
					{authPart && (
						<>
							<span
								className={styles.divider}
								aria-hidden="true"
							/>
							<div className={styles.authPart} data-testid="navbar-auth">{authPart}</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
