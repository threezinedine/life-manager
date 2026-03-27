/// <reference types="cypress" />

describe('Navbar', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	// ── Without auth token ────────────────────────────────────────────────────────

	it('walks through navbar without auth', () => {
		// Shows Sign in and Sign up buttons
		cy.contains('button', 'Sign in').should('be.visible');
		cy.contains('button', 'Sign up').should('be.visible');
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').should('be.visible');
		cy.get('[data-testid="navbar"]').contains('button', 'Sign up').should('be.visible');

		// No avatar when unauthenticated
		cy.get('[data-testid="navbar"]').find('[role="img"]').should('not.exist');

		// Navigates to login page
		cy.contains('button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.contains('h1', 'Welcome back').should('be.visible');

		// Navigates to register page
		cy.contains('button', 'Sign up').click();
		cy.url().should('match', /\/register/);
		cy.contains('h1', 'Create an account').should('be.visible');
	});

	// ── With auth token ─────────────────────────────────────────────────────────

	it('walks through navbar with auth', () => {
		// Register and log in to get a token
		const timestamp = Date.now();
		const username = `navuser_${timestamp}`;
		const email = `navuser_${timestamp}@example.com`;

		cy.visit('/register');
		cy.get('[data-testid="register-username"]').type(username);
		cy.get('[data-testid="register-email"]').type(email);
		cy.get('[data-testid="register-form-submit"]').click();
		cy.get('[data-testid="register-success-modal"]').should('be.visible');

		cy.get('[data-testid="register-success-modal"] code')
			.invoke('text')
			.then((t) => {
				const token = t as unknown as string;

				cy.visit('/login');
				cy.get('[data-testid="login-token"]').type(token);
				cy.get('[data-testid="login-form-submit"]').click();
				cy.contains('Login successful').should('be.visible');
			});

		cy.visit('/');

		// Shows avatar, hides Sign in / Sign up buttons
		cy.get('[data-testid="navbar"]').find('[role="img"]').should('be.visible');
		cy.contains('button', 'Sign in').should('not.exist');
		cy.contains('button', 'Sign up').should('not.exist');

		// Opens dropdown menu
		cy.get('[data-testid="navbar"]').find('[role="img"]').click();
		cy.contains('Profile').should('be.visible');
		cy.contains('Settings').should('be.visible');
		cy.contains('Log out').should('be.visible');

		// Logs out and returns to unauthenticated state
		cy.contains('Log out').click();
		cy.url().should('match', /\/login/);
		cy.contains('button', 'Sign in').should('be.visible');
		cy.contains('button', 'Sign up').should('be.visible');
	});
});
