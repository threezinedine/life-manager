/// <reference types="cypress" />

describe('Login Page', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	// ── Walkthrough ──────────────────────────────────────────────────────────────

	it('walks through the login flow', () => {
		// Renders correctly
		cy.contains('h1', 'Welcome back').should('be.visible');
		cy.contains('Sign in to continue to your account').should('be.visible');
		cy.get('[data-testid="login-token"]').should('be.visible');
		cy.get('[data-testid="login-form-submit"]').should('be.visible');

		// Navigates to register
		cy.contains("Don't have an account?").should('be.visible');
		cy.contains('a', 'Register').click();
		cy.url().should('match', /\/register/);
		cy.contains('h1', 'Create an account').should('be.visible');

		// Navigate back to login
		cy.visit('/login');

		// Shows validation error on empty submit
		cy.get('[data-testid="login-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');

		// Shows validation error when token is cleared
		cy.get('[data-testid="login-token"]').type('my-token');
		cy.get('[data-testid="login-token"]').clear();
		cy.get('[data-testid="login-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');

		// Accepts token input
		cy.get('[data-testid="login-token"]').type('my-secret-token');
		cy.get('[data-testid="login-token"]').should('have.value', 'my-secret-token');
	});

	// ── Special cases ──────────────────────────────────────────────────────────

	it('supports language switching to Vietnamese', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');
		cy.contains('Đăng nhập để tiếp tục với tài khoản của bạn').should('be.visible');
		cy.contains('Bạn chưa có tài khoản?').should('be.visible');
	});

	it('supports dark theme toggle across page reload', () => {
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.reload();
		cy.get('html').should('have.class', 'dark');
	});
});
