import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'cypress/support/e2e.ts',
		viewportWidth: 1280,
		viewportHeight: 720,
		video: false,
		screenshotOnRunFailure: true,
		chromeWebSecurity: false,
	},
});
