/// <reference types="cypress" />

describe('Language', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('walks through language switching', () => {
		// Shows English by default
		cy.contains('h1', 'Welcome to Life Manager!').should('be.visible');

		// Opens language selector
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('English').should('be.visible');
		cy.contains('Tiếng Việt').should('be.visible');

		// Switches to Vietnamese — home h1 is hardcoded in English, check login page
		cy.contains('Tiếng Việt').click();
		cy.visit('/login');
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');

		// Persists across page reload
		cy.reload();
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');
	});
});
