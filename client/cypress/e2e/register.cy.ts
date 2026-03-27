/// <reference types="cypress" />

/**
 * E2E test suite for the registration page.
 * All API calls are real — no mocking. Unique credentials (timestamp-based)
 * ensure each test run hits the live backend without conflicts.
 */

describe('Register Page', () => {
	beforeEach(() => {
		cy.visit('/register');
	});

	// ── Walkthrough ──────────────────────────────────────────────────────────────

	it('walks through the registration flow', () => {
		// Renders correctly
		cy.contains('h1', 'Create an account').should('be.visible');
		cy.contains('Join us and start managing your life').should(
			'be.visible'
		);
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

		// Accepts input with unique credentials for real API call
		const timestamp = Date.now();
		const username = `e2euser_${timestamp}`;
		const email = `e2e_${timestamp}@example.com`;
		cy.get('[data-testid="register-username"]').clear().type(username);
		cy.get('[data-testid="register-email"]').clear().type(email);
		cy.get('[data-testid="register-username"]').should(
			'have.value',
			username
		);
		cy.get('[data-testid="register-email"]').should('have.value', email);

		// Submit — real API call
		cy.get('[data-testid="register-form-submit"]').click();

		// Modal appears with the generated token
		cy.get('[data-testid="register-success-modal"]').should('be.visible');
		cy.contains('Registration successful').should('be.visible');

		// Copy to clipboard navigates to login
		cy.get('[data-testid="register-copy-token"]').click();

		cy.url().should('match', /\/login/);
		cy.contains('Token copied to clipboard!').should('be.visible');
	});

	// ── Special cases ──────────────────────────────────────────────────────────

	it('supports language switching to Vietnamese', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.contains('h1', 'Tạo tài khoản').should('be.visible');
		cy.contains('Tham gia và bắt đầu quản lý cuộc sống').should(
			'be.visible'
		);
		cy.contains('Bạn đã có tài khoản?').should('be.visible');
	});

	it('supports dark theme toggle across page reload', () => {
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.reload();
		cy.get('html').should('have.class', 'dark');
	});
});
