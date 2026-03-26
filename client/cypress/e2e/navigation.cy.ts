/// <reference types="cypress" />

describe('Navigation', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('walks through navigation between pages', () => {
		// Home page loads correctly
		cy.contains('h1', 'Welcome to Life Manager!').should('be.visible');

		// Navigates to login via navbar
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.contains('h1', 'Welcome back').should('be.visible');

		// Navigates to register via footer link
		cy.contains('a', 'Register').click();
		cy.url().should('match', /\/register/);
		cy.contains('h1', 'Create an account').should('be.visible');

		// Navigates to login via footer link
		cy.contains('a', 'Login').click();
		cy.url().should('match', /\/login/);

		// Navigates back to home
		cy.visit('/');

		// Theme persists across navigation
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').click();
		cy.get('html').should('have.class', 'dark');

		// Language persists across navigation
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');
		cy.visit('/register');
		cy.contains('h1', 'Tạo tài khoản').should('be.visible');
	});
});
