/// <reference types="cypress" />

describe('Refresh Page', () => {
	// ── Walkthrough ──────────────────────────────────────────────────────────────

	it('walks through the token refresh flow and verifies auth state changes', () => {
		// 1. Register a real user so we have a valid email + token
		const timestamp = Date.now();
		const username = `refresh_${timestamp}`;
		const email = `refresh_${timestamp}@example.com`;

		cy.visit('/register');
		cy.get('[data-testid="register-username"]').type(username);
		cy.get('[data-testid="register-email"]').type(email);
		cy.get('[data-testid="register-form-submit"]').click();
		cy.get('[data-testid="register-success-modal"]').should('be.visible');

		// 2. Capture token from the modal before it closes
		cy.get('[data-testid="register-success-modal"] code')
			.invoke('text')
			.then((t) => {
				const token = t as unknown as string;

				// 3. Go to login and authenticate
				cy.visit('/login');
				cy.get('[data-testid="login-token"]').type(token);
				cy.get('[data-testid="login-form-submit"]').click();
				cy.contains('Login successful!').should('be.visible');

				// 4. Navigate to /refresh — old token field should be pre-filled
				cy.visit('/refresh');
				cy.contains('h1', 'Refresh your token').should('be.visible');
				cy.get('[data-testid="refresh-email"]').should(
					'have.value',
					''
				);

				// 5. Fill in email and submit refresh
				cy.get('[data-testid="refresh-email"]').type(email);
				cy.get('[data-testid="refresh-form-submit"]').click();
				cy.contains('Token refreshed successfully!').should(
					'be.visible'
				);

				// 6. After refresh success, stay on refresh page (no redirect from /refresh)
				cy.url().should('match', /\/refresh/);

				// 7. Navbar should have "Sign in" and "Sign up", avatar should be gone — user is effectively logged out after refresh
				cy.get('[data-testid="navbar"]')
					.find('[role="img"]')
					.should('not.exist');
				cy.contains('button', 'Sign in').should('be.visible');
				cy.contains('button', 'Sign up').should('be.visible');
			});
	});
});
