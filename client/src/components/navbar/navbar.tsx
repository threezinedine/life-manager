import styles from './navbar.module.scss';
import clsx from 'clsx';
import Toggle from '@/components/toggle/toggle';
import { SunIcon, MoonIcon } from '@/icons';

export interface NavbarProps {
	logo: React.ReactNode;
	branch: string;
	checked: boolean;
	onToggle: (checked: boolean) => void;
	authPart?: React.ReactNode;
	className?: string;
}

export default function Navbar({
	logo,
	branch,
	checked,
	onToggle,
	authPart,
	className,
}: NavbarProps) {
	return (
		<nav className={clsx(styles.navbar, className)}>
			<div className={styles.container}>
				<div className={styles.left}>
					{logo && <span className={styles.logo}>{logo}</span>}
					{branch && <span className={styles.branch}>{branch}</span>}
				</div>
				<div className={styles.right}>
					<Toggle
						checked={checked}
						onChange={onToggle}
						checkedIcon={<MoonIcon />}
						uncheckedIcon={<SunIcon />}
						aria-label="Toggle theme"
					/>
					{authPart && (
						<>
							<span className={styles.divider} aria-hidden="true" />
							<div className={styles.authPart}>{authPart}</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
