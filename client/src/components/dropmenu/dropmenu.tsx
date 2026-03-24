import {
	forwardRef,
	useState,
	useRef,
	useEffect,
	useImperativeHandle,
	type ReactNode,
} from 'react';
import styles from './dropmenu.module.scss';
import clsx from 'clsx';

export interface DropMenuItem {
	label: string;
	icon?: ReactNode;
	shortcut?: string;
	onClick?: () => void;
	disabled?: boolean;
	danger?: boolean;
}

export interface DropMenuDivider {
	divider: true;
}

export type DropMenuEntry = DropMenuItem | DropMenuDivider;

export interface DropMenuProps {
	items: DropMenuEntry[];
	align?: 'left' | 'right';
	children: ReactNode;
	className?: string;
}

export interface DropMenuRef {
	open: () => void;
	close: () => void;
}

function isDivider(entry: DropMenuEntry): entry is DropMenuDivider {
	return 'divider' in entry && entry.divider === true;
}

const DropMenu = forwardRef<DropMenuRef, DropMenuProps>(
	({ items, align = 'right', children, className }, ref) => {
		const [open, setOpen] = useState(false);
		const containerRef = useRef<HTMLDivElement>(null);
		const dropdownRef = useRef<HTMLUListElement>(null);

		useImperativeHandle(ref, () => ({
			open: () => setOpen(true),
			close: () => setOpen(false),
		}));

		// Close on outside click (but not if the click landed on the trigger)
		useEffect(() => {
			if (!open) return;
			const handleClickOutside = (e: MouseEvent) => {
				// Skip if the click is on the trigger or dropdown itself
				if (
					containerRef.current &&
					containerRef.current.contains(e.target as Node)
				) {
					return;
				}
				setOpen(false);
			};
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}, [open]);

		// Close on Escape
		useEffect(() => {
			if (!open) return;
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') setOpen(false);
			};
			document.addEventListener('keydown', handleKeyDown);
			return () => document.removeEventListener('keydown', handleKeyDown);
		}, [open]);

		const handleTriggerClick = () => {
			setOpen((prev) => !prev);
		};

		return (
			<div ref={containerRef} className={clsx(styles.menu, className)}>
				<div onClick={handleTriggerClick}>{children}</div>

				<ul
					ref={dropdownRef}
					className={clsx(styles.dropdown, {
						[styles['align-left']]: align === 'left',
						[styles['dropdown-hidden']]: !open,
					})}
					role="menu"
					aria-hidden={!open}
				>
					{items.map((item, i) =>
						isDivider(item) ? (
							<li key={i} role="separator" className={styles.divider} />
						) : (
							<li key={i} role="menuitem">
								<button
									className={styles.item}
									onClick={() => {
										if (item.disabled) return;
										item.onClick?.();
										setOpen(false);
									}}
									disabled={item.disabled}
									tabIndex={open ? 0 : -1}
								>
									{item.icon && (
										<span className={styles['item-icon']}>{item.icon}</span>
									)}
									<span className={styles['item-label']}>{item.label}</span>
									{item.shortcut && (
										<span className={styles['item-shortcut']}>
											{item.shortcut}
										</span>
									)}
								</button>
							</li>
						),
					)}
				</ul>
			</div>
		);
	},
);

DropMenu.displayName = 'DropMenu';

export default DropMenu;
