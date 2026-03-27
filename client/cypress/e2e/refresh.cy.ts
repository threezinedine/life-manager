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

				// 4. Navigate to /refresh — avatar should still be visible before any refresh attempt
				cy.visit('/refresh');
				cy.contains('h1', 'Refresh your token').should('be.visible');
				cy.get('[data-testid="navbar"]')
					.find('[role="img"]')
					.should('be.visible');
				cy.get('[data-testid="refresh-email"]').should(
					'have.value',
					''
				);

				// 5. Submit refresh with a wrong email — should show error and no clear auth
				cy.get('[data-testid="refresh-email"]').type(
					'wrong@example.com'
				);
				cy.get('[data-testid="refresh-form-submit"]').click();
				cy.contains('Token refreshed successfully!').should(
					'not.exist'
				);

				// 6. After wrong-email refresh, avatar should still be visible (auth not cleared)
				cy.get('[data-testid="navbar"]')
					.find('[role="img"]')
					.should('be.visible');
				cy.contains('button', 'Sign in').should('not.exist');
				cy.contains('button', 'Sign up').should('not.exist');

				// Submit refresh with the correct email — should succeed and clear auth
				cy.get('[data-testid="refresh-email"]').clear().type(email);
				cy.get('[data-testid="refresh-form-submit"]').click();
				cy.contains('Token refreshed successfully!').should(
					'be.visible'
				);

				// After correct refresh, avatar should be gone (auth cleared)
				cy.get('[data-testid="navbar"]')
					.find('[role="img"]')
					.should('not.exist');
				cy.contains('button', 'Sign in').should('be.visible');
				cy.contains('button', 'Sign up').should('be.visible');

				// 7. Log in again with the original token
				cy.visit('/login');
				cy.get('[data-testid="login-token"]').type(token);
				cy.get('[data-testid="login-form-submit"]').click();
				cy.contains('Login successful!').should('be.visible');

				// 8. Navigate back to /refresh and submit with the correct email
				cy.visit('/refresh');
				cy.get('[data-testid="navbar"]')
					.find('[role="img"]')
					.should('be.visible');
				cy.get('[data-testid="refresh-email"]').type(email);
				cy.get('[data-testid="refresh-form-submit"]').click();
				cy.contains('Token refreshed successfully!').should(
					'be.visible'
				);

				// 9. After correct refresh, stay on refresh page — avatar should be gone
				cy.url().should('match', /\/refresh/);
				cy.get('[data-testid="navbar"]')
					.find('[role="img"]')
					.should('not.exist');
				cy.contains('button', 'Sign in').should('be.visible');
				cy.contains('button', 'Sign up').should('be.visible');
			});
	});
});
