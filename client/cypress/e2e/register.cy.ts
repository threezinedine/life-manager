/// <reference types="cypress" />

describe('Register Page', () => {
	beforeEach(() => {
		cy.visit('/register');
	});

	// ── Rendering ───────────────────────────────────────────────────────────────

	it('renders the page title and subtitle', () => {
		cy.contains('h1', 'Create an account').should('be.visible');
		cy.contains('Join us and start managing your life').should('be.visible');
	});

	it('renders all four fields', () => {
		cy.get('[data-testid="register-username"]').should('be.visible');
		cy.get('[data-testid="register-email"]').should('be.visible');
		cy.get('[data-testid="register-password"]').should('be.visible');
		cy.get('[data-testid="register-confirm-password"]').should('be.visible');
	});

	it('renders the submit button', () => {
		cy.get('[data-testid="register-form-submit"]').should('be.visible');
	});

	it('renders a footer link to the login page', () => {
		cy.contains('Already have an account?').should('be.visible');
		cy.contains('a', 'Login').should('be.visible');
	});

	// ── Navigation ─────────────────────────────────────────────────────────────

	it('navigates to the login page when clicking the footer link', () => {
		cy.contains('a', 'Login').click();
		cy.url().should('match', /\/login/);
		cy.contains('h1', 'Welcome back').should('be.visible');
	});

	it('navigates to register via navbar Sign up button', () => {
		cy.visit('/');
		cy.get('[data-testid="navbar"]').contains('button', 'Sign up').click();
		cy.url().should('match', /\/register/);
		cy.contains('h1', 'Create an account').should('be.visible');
	});

	it('navigates to login via navbar Sign in button', () => {
		cy.get('[data-testid="navbar"]').contains('button', 'Sign in').click();
		cy.url().should('match', /\/login/);
	});

	// ── Validation ──────────────────────────────────────────────────────────────

	it('shows validation errors when submitting empty', () => {
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('have.length.at.least', 1);
	});

	it('shows a validation error when username is missing', () => {
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');
	});

	it('shows a validation error when email is missing', () => {
		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');
	});

	it('shows a validation error when password is missing', () => {
		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();
		cy.contains('This field is required').should('be.visible');
	});

	// ── Loading state ───────────────────────────────────────────────────────────

	it('disables the submit button while loading', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
			delay: 500,
		}).as('register');

		cy.clock();

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.tick(100);
		cy.get('[data-testid="register-form-submit"]').should('be.disabled');

		cy.tick(500);
		cy.wait('@register');
	});

	// ── Successful registration & toast ──────────────────────────────────────────

	it('shows a success toast after successful registration', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
		}).as('registerRequest');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerRequest');
		cy.get('[data-testid="register-success-toast"]').should('be.visible');
		cy.get('[data-testid="register-success-toast"]').should(
			'contain',
			'Account created successfully'
		);
	});

	it('success toast is inside the toast container', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
		}).as('registerRequest');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerRequest');
		cy.get('[data-testid="toast-container"]').within(() => {
			cy.get('[data-testid="register-success-toast"]').should('be.visible');
		});
	});

	it('success toast auto-dismisses after default duration', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
		}).as('registerRequest');

		cy.clock();

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerRequest');
		cy.get('[data-testid="register-success-toast"]').should('be.visible');

		cy.tick(3100);
		cy.get('[data-testid="register-success-toast"]').should('not.exist');
	});

	it('success toast can be dismissed manually by clicking close button', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
		}).as('registerRequest');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerRequest');
		cy.get('[data-testid="register-success-toast"]').should('be.visible');

		cy.get('[data-testid="register-success-toast"] button[aria-label="Close"]').click();
		cy.get('[data-testid="register-success-toast"]').should('not.exist');
	});

	it('calls the API with correct payload on valid submit', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
		}).as('registerRequest');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerRequest').then((interception) => {
			expect(interception.request.body).to.deep.equal({
				username: 'testuser',
				email: 'user@example.com',
				password: 'password123',
				confirmPassword: 'password123',
			});
		});
	});

	// ── Error toast ─────────────────────────────────────────────────────────────

	it('shows an error toast when registration fails (duplicate email)', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 409,
			body: { message: 'An account with this email already exists' },
		}).as('registerFail');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('existing@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerFail');
		cy.get('[data-testid="register-error-toast"]').should('be.visible');
		cy.get('[data-testid="register-error-toast"]').should(
			'contain',
			'An account with this email already exists'
		);
	});

	it('shows an error toast when the server returns a 500', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 500,
			body: { message: 'Internal server error' },
		}).as('serverError');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@serverError');
		cy.get('[data-testid="register-error-toast"]').should('be.visible');
		cy.get('[data-testid="register-error-toast"]').should('contain', 'Internal server error');
	});

	it('shows an error toast when the network request fails', () => {
		cy.intercept('POST', '**/auth/register', { forceError: true }).as('networkError');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@networkError', { requestTimeout: 5000 });
		cy.get('[data-testid="register-error-toast"]').should('be.visible');
	});

	it('error toast can be dismissed manually', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 409,
			body: { message: 'Email already taken' },
		}).as('registerFail');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('existing@example.com');
		cy.get('[data-testid="register-password"]'). type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerFail');
		cy.get('[data-testid="register-error-toast"]').should('be.visible');

		cy.get('[data-testid="register-error-toast"] button[aria-label="Close"]').click();
		cy.get('[data-testid="register-error-toast"]').should('not.exist');
	});

	it('error toast auto-dismisses after default duration', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 409,
			body: { message: 'Email already taken' },
		}).as('registerFail');

		cy.clock();

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('existing@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerFail');
		cy.get('[data-testid="register-error-toast"]').should('be.visible');

		cy.tick(3100);
		cy.get('[data-testid="register-error-toast"]').should('not.exist');
	});

	it('success toast does not appear on failed registration', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 409,
			body: { message: 'Email already taken' },
		}).as('registerFail');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('existing@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerFail');
		cy.get('[data-testid="register-success-toast"]').should('not.exist');
	});

	it('error toast does not appear on successful registration', () => {
		cy.intercept('POST', '**/auth/register', {
			statusCode: 200,
			body: { token: 'fake-token', user: { id: '1', email: 'a@b.com', username: 'testuser' } },
		}).as('registerRequest');

		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');
		cy.get('[data-testid="register-form-submit"]').click();

		cy.wait('@registerRequest');
		cy.get('[data-testid="register-error-toast"]').should('not.exist');
	});

	// ── Input interactions ──────────────────────────────────────────────────────

	it('accepts input in all fields correctly', () => {
		cy.get('[data-testid="register-username"]').type('testuser');
		cy.get('[data-testid="register-email"]').type('user@example.com');
		cy.get('[data-testid="register-password"]').type('password123');
		cy.get('[data-testid="register-confirm-password"]').type('password123');

		cy.get('[data-testid="register-username"]').should('have.value', 'testuser');
		cy.get('[data-testid="register-email"]').should('have.value', 'user@example.com');
		cy.get('[data-testid="register-password"]').should('have.value', 'password123');
		cy.get('[data-testid="register-confirm-password"]').should('have.value', 'password123');
	});

	it('allows clearing and retyping email field', () => {
		cy.get('[data-testid="register-email"]').type('first@example.com');
		cy.get('[data-testid="register-email"]').clear().type('second@example.com');
		cy.get('[data-testid="register-email"]').should('have.value', 'second@example.com');
	});

	// ── Language / i18n ─────────────────────────────────────────────────────────

	it('shows Vietnamese text after switching language', () => {
		cy.get('[data-testid="language-selector"]').click();
		cy.contains('Tiếng Việt').click();
		cy.contains('h1', 'Tạo tài khoản').should('be.visible');
		cy.contains('Tham gia và bắt đầu quản lý cuộc sống').should('be.visible');
		cy.contains('Bạn đã có tài khoản?').should('be.visible');
	});

	// ── Theme ───────────────────────────────────────────────────────────────────

	it('persists dark theme across page reload', () => {
		cy.get('[data-testid="theme-toggle"]').click();
		cy.get('html').should('have.class', 'dark');
		cy.reload();
		cy.get('html').should('have.class', 'dark');
	});
});
