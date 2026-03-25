/// <reference types="cypress" />

describe('Navigation', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('loads the home page by default', () => {
		cy.contains('h1, h2', 'Welcome to Life Manager!').should('be.visible');
	});

	it('navigates from home to login via navbar button', () => {
		cy.contains('nav button', 'Sign in').click();
		cy.url().should('match', /\/login/);
		cy.contains('h1', 'Welcome back').should('be.visible');
	});

	it('navigates from home to register via navbar button', () => {
		cy.contains('nav button', 'Sign up').click();
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
		// Find theme toggle button (the theme toggle is the last button in the nav)
		cy.get('nav button').last().as('toggleBtn');
		cy.get('@toggleBtn').click();
		cy.get('html').should('have.class', 'dark');
		cy.contains('nav button', 'Sign in').click();
		cy.get('html').should('have.class', 'dark'); // Theme should persist across SPA navigation
	});

	it('persists language preference after navigating between pages', () => {
		cy.get('button[aria-label="Select language"]').click();
		cy.contains('Tiếng Việt').click();
		// Language persists across SPA navigation — verify the login page renders in Vietnamese
		cy.visit('/login');
		cy.contains('h1', 'Chào mừng trở lại').should('be.visible');
	});
});
