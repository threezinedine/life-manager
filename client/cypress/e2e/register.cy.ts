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
		cy.get('input[type="text"]').should('be.visible');
		cy.get('input[type="email"]').should('be.visible');
		// Use exact match to avoid matching "Confirm password" label which also contains "Password"
		cy.get('input[type="password"]').should('be.visible');
		cy.get('input[type="password"]').should('be.visible');
	});

	it('shows validation errors when submitting empty', () => {
		cy.get('button[type="submit"]').click();
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

		cy.get('input[type="text"]').type('testuser');
		cy.get('input[type="email"]').type('user@example.com');
		cy.get('input[type="password"]').first().type('password123');
		cy.get('input[type="password"]').last().type('password123');
		cy.get('button[type="submit"]').click();
	});

	it('has a link to the login page', () => {
		cy.contains('Already have an account?').should('be.visible');
		cy.contains('a, [role="link"]', 'Login').should('be.visible').click();
		cy.url().should('match', /\/login/);
	});

	it('navbar Sign in and Sign up buttons navigate correctly', () => {
		cy.contains('nav button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.contains('nav button', 'Sign up').click();
		cy.url().should('match', /\/register/);
	});
});
