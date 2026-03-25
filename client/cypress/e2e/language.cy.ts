/// <reference types="cypress" />

describe('Language', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('shows English heading by default', () => {
		cy.contains('h1, h2', 'Welcome to Life Manager!').should('be.visible');
	});

	it('opens the language selector dropdown', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('English').should('be.visible');
		cy.contains('Tiếng Việt').should('be.visible');
	});

	it('switches to Vietnamese when selected', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.get('[data-testid="language-selector"]').should('be.visible');
	});

	it('persists the language selection across page reloads', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.reload();
		cy.contains('h1, h2', 'Welcome to Life Manager!').should('be.visible');
	});
});
