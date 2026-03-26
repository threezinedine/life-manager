/// <reference types="cypress" />

describe('Theme', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('walks through theme toggle', () => {
		// Light mode by default
		cy.get('html').should('have.class', 'light');
		cy.get('html').should('not.have.class', 'dark');

		// Toggles to dark mode
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.get('html').should('not.have.class', 'light');

		// Toggles back to light mode
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'light');
		cy.get('html').should('not.have.class', 'dark');

		// Persists across page reload
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.reload();
		cy.get('html').should('have.class', 'dark');
	});
});
