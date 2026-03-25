/// <reference types="cypress" />

describe('Register Page', () => {
	beforeEach(() => {
		cy.visit('/register');
	});

	it('renders the page title and subtitle', () => {
		cy.contains('h1', 'Create an account').should('be.visible');
		cy.contains('Join us and start managing your life').should(
			'be.visible'
		);
	});

	it('renders all four fields', () => {
		cy.get('[data-testid="register-username"]').should('be.visible');
		cy.get('[data-testid="register-email"]').should('be.visible');
		cy.get('[data-testid="register-password"]').should('be.visible');
		cy.get('[data-testid="register-confirm-password"]').should('be.visible');
	});

	it('shows validation errors when submitting empty', () => {
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').first().should('be.visible');
	});

	it('accepts valid input and submits', () => {
		cy.intercept('**/auth/register', {
			statusCode: 200,
			body: {
				token: 'fake-token',
				user: { id: '1', email: 'a@b.com', username: 'test' },
			},
		}).as('register');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();
	});

	it('has a link to the login page', () => {
		cy.contains('Already have an account?').should('be.visible');
		cy.contains('a, [role="link"]', 'Login').should('be.visible').click();
		cy.url().should('match', /\/login/);
	});

	it('navbar Sign in and Sign up buttons navigate correctly', () => {
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.get('[data-testid="navbar"]').contains('button', 'Sign up').click();
		cy.url().should('match', /\/register/);
	});
});
