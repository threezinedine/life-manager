/// <reference types="cypress" />

describe('Navigation', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	// ── Without auth token ────────────────────────────────────────────────────────

	it('walks through navigation between pages (no auth)', () => {
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

	// ── With auth token ─────────────────────────────────────────────────────────

	it('walks through navigation with an auth token (auth guard)', () => {
		// Register a real user and capture the token from the success modal
		const timestamp = Date.now();
		const username = `navguard_${timestamp}`;
		const email = `navguard_${timestamp}@example.com`;

		cy.visit('/register');
		cy.get('[data-testid="register-username"]').type(username);
		cy.get('[data-testid="register-email"]').type(email);
		cy.get('[data-testid="register-form-submit"]').click();
		cy.get('[data-testid="register-success-modal"]').should('be.visible');

		cy.get('[data-testid="register-success-modal"] code')
			.invoke('text')
			.then((t) => {
				const token = t as unknown as string;

				// Go to login and log in with the real token
				cy.visit('/login');
				cy.get('[data-testid="login-token"]').type(token);
				cy.get('[data-testid="login-form-submit"]').click();
				cy.contains('Login successful').should('be.visible');

				// With token in storage, /login redirects to home
				cy.visit('/login');
				cy.url().should('match', /^.*\/?$/);
				cy.contains('Welcome to Life Manager!').should('be.visible');

				// With token in storage, /register redirects to home
				cy.visit('/register');
				cy.url().should('match', /^.*\/?$/);
				cy.contains('Welcome to Life Manager!').should('be.visible');
			});
	});
});
