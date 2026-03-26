/// <reference types="cypress" />

describe('Register Page', () => {
	beforeEach(() => {
		cy.visit('/register');
	});

	// ── Walkthrough ──────────────────────────────────────────────────────────────

	it('walks through the registration flow', () => {
		// Renders correctly
		cy.contains('h1', 'Create an account').should('be.visible');
		cy.contains('Join us and start managing your life').should('be.visible');
		cy.get('[data-testid="register-username"]').should('be.visible');
		cy.get('[data-testid="register-email"]').should('be.visible');
		cy.get('[data-testid="register-form-submit"]').should('be.visible');

		// Navigates to login
		cy.contains('Already have an account?').should('be.visible');
		cy.contains('a', 'Login').click();
		cy.url().should('match', /\/login/);
		cy.contains('h1', 'Welcome back').should('be.visible');

		// Navigate back to register
		cy.visit('/register');

		// Shows validation errors on empty submit
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('have.length.at.least', 1);

		// Shows validation error when username is missing
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');

		// Shows validation error when email is missing
		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').clear();
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');

		// Accepts input
		cy.get('[data-testid="register-username"]').clear().type('testuser');
		cy.get('[data-testid="register-email"]').clear().type('user@example.com');
		cy.get('[data-testid="register-username"]').should('have.value', 'testuser');
		cy.get('[data-testid="register-email"]').should('have.value', 'user@example.com');
	});

	// ── Special cases ──────────────────────────────────────────────────────────

	it('supports language switching to Vietnamese', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.contains('h1', 'Tạo tài khoản').should('be.visible');
		cy.contains('Tham gia và bắt đầu quản lý cuộc sống').should('be.visible');
		cy.contains('Bạn đã có tài khoản?').should('be.visible');
	});

	it('supports dark theme toggle across page reload', () => {
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.reload();
		cy.get('html').should('have.class', 'dark');
	});
});
