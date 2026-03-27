/// <reference types="cypress" />

describe('Language', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	// ── Walkthrough ──────────────────────────────────────────────────────────────

	it('walks through language switching and server localisation', () => {
		// Shows English by default
		cy.contains('h1', 'Welcome to Life Manager!').should('be.visible');

		// Opens language selector
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('English').should('be.visible');
		cy.contains('Tiếng Việt').should('be.visible');

		// Switches to Vietnamese — verify on login page
		cy.contains('Tiếng Việt').click();
		cy.visit('/login');
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');

		// Server responds in Vietnamese — type a valid UUID format so form passes client validation,
		// server then rejects it with a Vietnamese error
		cy.intercept('POST', '**/auth/login').as('loginRequest');
		cy.get('[data-testid="login-token"]').type('00000000-0000-0000-0000-000000000000');
		cy.get('[data-testid="login-form-submit"]').click();
		cy.wait('@loginRequest');
		cy.get('[data-testid="login-error-toast"]').should('be.visible');
		cy.get('[data-testid="login-error-toast"]').should('contain', 'Token không hợp lệ');

		// Language persists across page reload
		cy.reload();
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');

		// Switches back to English
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('English').click();
		cy.contains('h1', 'Welcome back').should('be.visible');
	});

	// ── Special cases ──────────────────────────────────────────────────────────

	it('falls back to English when no language is set', () => {
		cy.clearLocalStorage();
		cy.visit('/login');
		cy.contains('h1', 'Welcome back').should('be.visible');
	});
});
