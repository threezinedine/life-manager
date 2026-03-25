/// <reference types="cypress" />

describe('Theme', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('loads the page in light mode by default', () => {
		cy.get('html').should('have.class', 'light');
		cy.get('html').should('not.have.class', 'dark');
	});

	it('toggles to dark mode when the toggle is clicked', () => {
		// The theme toggle is the last button in the nav bar
		cy.get('nav button').last().click();
		cy.get('html').should('have.class', 'dark');
		cy.get('html').should('not.have.class', 'light');
	});

	it('toggles back to light mode when clicked again', () => {
		cy.get('nav button').last().as('toggleBtn');
		cy.get('@toggleBtn').click();
		cy.get('@toggleBtn').click();
		cy.get('html').should('have.class', 'light');
		cy.get('html').should('not.have.class', 'dark');
	});

	it('persists the theme selection across page reloads', () => {
		cy.get('nav button').last().click();
		cy.get('html').should('have.class', 'dark');
		cy.reload();
		cy.get('html').should('have.class', 'dark');
	});
});
