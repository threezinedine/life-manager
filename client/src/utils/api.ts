export function getServerUrl() {
	let apiBaseUrl: string;
	console.log('SERVER_HOST:', import.meta.env.VITE_SERVER_HOST);
	console.log('SERVER_PORT:', import.meta.env.VITE_SERVER_PORT);

	if (
		!import.meta.env.VITE_SERVER_HOST &&
		!import.meta.env.VITE_SERVER_PORT
	) {
		console.warn(
			'SERVER_HOST and SERVER_PORT environment variables are not set. Defaulting to http://localhost:3000'
		);
		apiBaseUrl = 'http://localhost:3000/api';
	} else {
		apiBaseUrl = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/api`;
		console.log(`Using API base URL: ${apiBaseUrl}`);
	}
	return apiBaseUrl;
}
