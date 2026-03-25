/// <reference types="cypress" />

describe('Login Page', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('renders the page title and subtitle', () => {
		cy.contains('h1', 'Welcome back').should('be.visible');
		cy.contains('Sign in to continue to your account').should('be.visible');
	});

	it('renders email and password fields', () => {
		cy.get('input[type="email"]').should('be.visible');
		cy.get('input[type="password"]').should('be.visible');
	});

	it('shows validation errors when submitting empty', () => {
		cy.get('button[type="submit"]').click();
		cy.contains('This field is required').first().should('be.visible');
	});

	it('accepts valid input and submits', () => {
		cy.intercept('**/auth/login', {
			statusCode: 200,
			body: {
				token: 'fake-token',
				user: { id: '1', email: 'a@b.com', username: 'test' },
			},
		}).as('login');

		cy.get('input[type="email"]').type('user@example.com');
		cy.get('input[type="password"]').type('password123');
		cy.get('button[type="submit"]').click();
	});

	it('has a link to the register page', () => {
		cy.contains("Don't have an account?").should('be.visible');
		cy.contains('a, [role="link"]', 'Register')
			.should('be.visible')
			.click();
		cy.url().should('match', /\/register/);
	});

	it('navbar Sign in and Sign up buttons navigate correctly', () => {
		cy.contains('nav button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.contains('nav button', 'Sign up').click();
		cy.url().should('match', /\/register/);
	});
});
