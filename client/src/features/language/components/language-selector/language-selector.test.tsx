import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelector from './language-selector';
import { useLanguageStore } from '@/features/language';

// buildMenuItems is exported from the component module so we can test it directly.
// We construct the same items the component would build for a given language.
import { buildMenuItems } from './language-selector';

describe('LanguageSelector', () => {
	beforeEach(() => {
		cleanup();
		useLanguageStore.setState({ lang: 'en' });
	});

	describe('trigger rendering', () => {
		it('renders the trigger button with aria-label', () => {
			render(<LanguageSelector />);
			expect(
				screen.getByRole('button', { name: 'Select language' })
			).toBeInTheDocument();
		});

		it('applies optional className to the DropMenu', () => {
			const { container } = render(<LanguageSelector className="custom-class" />);
			expect(container.firstChild?.className).toMatch(/custom-class/);
		});
	});

	describe('dropdown menu', () => {
		async function openMenu() {
			const user = userEvent.setup();
			await user.click(screen.getByRole('button', { name: 'Select language' }));
		}

		it('opens the dropdown when trigger is clicked', async () => {
			render(<LanguageSelector />);
			await openMenu();
			expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
				'aria-hidden',
				'false'
			);
		});

		it('shows both English and Vietnamese options in the menu', async () => {
			render(<LanguageSelector />);
			await openMenu();

			expect(screen.getByRole('menuitem', { name: 'English' })).toBeInTheDocument();
			expect(screen.getByRole('menuitem', { name: 'Tiếng Việt' })).toBeInTheDocument();
		});

		it('closes the menu when Escape is pressed', async () => {
			render(<LanguageSelector />);
			await openMenu();

			await userEvent.keyboard('{Escape}');
			expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
				'aria-hidden',
				'true'
			);
		});

		it('closes the menu when clicking outside', async () => {
			render(<LanguageSelector />);
			await openMenu();

			await userEvent.click(document.body);
			expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
				'aria-hidden',
				'true'
			);
		});
	});

	describe('active language indicator', () => {
		async function openMenu() {
			const user = userEvent.setup();
			await user.click(screen.getByRole('button', { name: 'Select language' }));
		}

		it('shows a check icon next to the active language (English by default)', async () => {
			render(<LanguageSelector />);
			await openMenu();

			const englishItem = screen.getByRole('menuitem', { name: 'English' });
			const checkIcon = englishItem.querySelector('svg');
			expect(checkIcon).toBeInTheDocument();
		});

		it('shows the check icon next to Vietnamese when Vietnamese is selected', async () => {
			useLanguageStore.setState({ lang: 'vi' });
			render(<LanguageSelector />);
			await openMenu();

			const vietnameseItem = screen.getByRole('menuitem', { name: 'Tiếng Việt' });
			const checkIcon = vietnameseItem.querySelector('svg');
			expect(checkIcon).toBeInTheDocument();
		});

		it('does not show a check icon next to the non-active language', async () => {
			render(<LanguageSelector />);
			await openMenu();

			const vietnameseItem = screen.getByRole('menuitem', { name: 'Tiếng Việt' });
			// The non-active language only has a flag SVG — no polyline check icon
			const checkIcon = vietnameseItem.querySelector('polyline');
			expect(checkIcon).toBeNull();
		});
	});

	describe('buildMenuItems (unit)', () => {
		it('calls onLangChange with "vi" when the Vietnamese item is clicked', () => {
			const onLangChange = vi.fn();
			const items = buildMenuItems('en', onLangChange);

			// Vietnamese item is the second one (index 1)
			(items[1] as { onClick: () => void }).onClick();

			expect(onLangChange).toHaveBeenCalledTimes(1);
			expect(onLangChange).toHaveBeenCalledWith('vi');
		});

		it('calls onLangChange with "en" when the English item is clicked', () => {
			const onLangChange = vi.fn();
			const items = buildMenuItems('vi', onLangChange);

			// English item is the first one (index 0)
			(items[0] as { onClick: () => void }).onClick();

			expect(onLangChange).toHaveBeenCalledTimes(1);
			expect(onLangChange).toHaveBeenCalledWith('en');
		});

		it('adds a shortcut (check icon) to the active language only', () => {
			const onLangChange = vi.fn();

			// When English is active, only the English item has a shortcut
			const enActive = buildMenuItems('en', onLangChange);
			expect((enActive[0] as { shortcut?: unknown }).shortcut).toBeTruthy();
			expect((enActive[1] as { shortcut?: unknown }).shortcut).toBeUndefined();

			// When Vietnamese is active, only the Vietnamese item has a shortcut
			const viActive = buildMenuItems('vi', onLangChange);
			expect((viActive[0] as { shortcut?: unknown }).shortcut).toBeUndefined();
			expect((viActive[1] as { shortcut?: unknown }).shortcut).toBeTruthy();
		});
	});
});
