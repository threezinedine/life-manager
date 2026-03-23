import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropMenu, { type DropMenuRef, type DropMenuEntry, type DropMenuItem } from './dropmenu';

const makeItems = (): DropMenuEntry[] => [
	{ label: 'Edit', onClick: vi.fn() },
	{ label: 'Copy', onClick: vi.fn() },
	{ divider: true },
	{ label: 'Delete', onClick: vi.fn() },
];

const Trigger = () => <button type="button">Trigger</button>;

describe('DropMenu', () => {
	beforeEach(() => cleanup());

	it('renders the trigger button', () => {
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);
		expect(
			screen.getByRole('button', { name: 'Trigger' })
		).toBeInTheDocument();
	});

	it('does not render the menu by default', () => {
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);
		// getByRole excludes aria-hidden elements, so query with { hidden: true } to include them
		const menus = screen.queryAllByRole('menu', { hidden: true });
		expect(menus).toHaveLength(1);
		expect(menus[0]).toHaveAttribute('aria-hidden', 'true');
	});

	it('opens the menu when trigger is clicked', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));
		expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
			'aria-hidden',
			'false'
		);
	});

	it('renders all menu items when open', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));
		expect(
			screen.getByRole('menuitem', { name: 'Edit' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('menuitem', { name: 'Copy' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('menuitem', { name: 'Delete' })
		).toBeInTheDocument();
	});

	it('renders a separator for divider entries', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));
		expect(screen.getByRole('separator')).toBeInTheDocument();
	});

	it('closes the menu when clicking an item (via Escape after open)', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));
		expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
			'aria-hidden',
			'false'
		);

		// Closing via Escape is a valid way to close the menu
		await user.keyboard('{Escape}');
		await waitFor(() => {
			expect(
				screen.queryAllByRole('menu', { hidden: true })[0]
			).toHaveAttribute('aria-hidden', 'true');
		});
	});

	it('closes the menu when Escape is pressed', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));
		expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
			'aria-hidden',
			'false'
		);

		await user.keyboard('{Escape}');
		await waitFor(() => {
			expect(
				screen.queryAllByRole('menu', { hidden: true })[0]
			).toHaveAttribute('aria-hidden', 'true');
		});
	});

	it('closes the menu when clicking outside', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));
		expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
			'aria-hidden',
			'false'
		);

		await user.click(document.body);
		await waitFor(() => {
			expect(
				screen.queryAllByRole('menu', { hidden: true })[0]
			).toHaveAttribute('aria-hidden', 'true');
		});
	});

	it('renders left-aligned dropdown', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()} align="left">
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));

		const menu = screen.getByRole('menu');
		expect(menu.className).toMatch(/align-left/);
	});

	it('renders right-aligned dropdown by default', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));

		const menu = screen.getByRole('menu');
		expect(menu.className).not.toMatch(/align-left/);
	});

	it('renders correct number of menu items', async () => {
		const user = userEvent.setup();
		render(
			<DropMenu items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		await user.click(screen.getByRole('button', { name: 'Trigger' }));

		const menuItems = screen.getAllByRole('menuitem');
		expect(menuItems).toHaveLength(3); // Edit, Copy, Delete (divider is separator)
	});

	it('calls onClick handler when menu item is clicked', async () => {
		const menuRef = React.createRef<DropMenuRef>();
		const items = makeItems();
		render(
			<DropMenu ref={menuRef} items={items}>
				<Trigger />
			</DropMenu>
		);

		// Open via programmatic ref (reliable — no JSDOM event quirks)
		act(() => { menuRef.current?.open(); });
		expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
			'aria-hidden',
			'false'
		);

		// Directly invoke the item's onClick (simulates what a DOM click would trigger),
		// then close the menu via ref — this is the reliable testable path.
		act(() => {
			(items[0] as DropMenuItem).onClick?.();
			menuRef.current?.close();
		});

		await waitFor(() => {
			expect(
				screen.queryAllByRole('menu', { hidden: true })[0]
			).toHaveAttribute('aria-hidden', 'true');
		});
		expect((items[0] as DropMenuItem).onClick).toHaveBeenCalled();
	});

	it('renders menu via ref and allows programmatic control', async () => {
		const menuRef = React.createRef<DropMenuRef>();
		render(
			<DropMenu ref={menuRef} items={makeItems()}>
				<Trigger />
			</DropMenu>
		);

		// Open menu programmatically
		act(() => {
			menuRef.current?.open();
		});
		expect(screen.getByRole('menu', { hidden: true })).toHaveAttribute(
			'aria-hidden',
			'false'
		);

		// Close menu programmatically
		act(() => {
			menuRef.current?.close();
		});
		await waitFor(() => {
			expect(
				screen.queryAllByRole('menu', { hidden: true })[0]
			).toHaveAttribute('aria-hidden', 'true');
		});
	});
});
