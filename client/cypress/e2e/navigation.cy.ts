/// <reference types="cypress" />

describe('Navigation', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('loads the home page by default', () => {
		cy.contains('h1, h2', 'Welcome to Life Manager!').should('be.visible');
	});

	it('navigates from home to login via navbar button', () => {
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.contains('h1', 'Welcome back').should('be.visible');
	});

	it('navigates from home to register via navbar button', () => {
		cy.get('[data-testid="navbar"]').contains('button', 'Sign up').click();
		cy.url().should('match', /\/register/);
		cy.contains('h1', 'Create an account').should('be.visible');
	});

	it('login page footer link navigates to register', () => {
		cy.visit('/login');
		cy.contains('a, [role="link"]', 'Register').click();
		cy.url().should('match', /\/register/);
	});

	it('register page footer link navigates to login', () => {
		cy.visit('/register');
		cy.contains('a, [role="link"]', 'Login').click();
		cy.url().should('match', /\/login/);
	});

	it('persists theme preference after navigating between pages', () => {
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').click();
		cy.get('html').should('have.class', 'dark');
	});

	it('persists language preference after navigating between pages', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.visit('/login');
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');
	});
});
