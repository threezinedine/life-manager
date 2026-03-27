export function getServerUrl() {
	let apiBaseUrl: string;

	if (
		!import.meta.env.VITE_SERVER_HOST &&
		!import.meta.env.VITE_SERVER_PORT
	) {
		apiBaseUrl = 'http://localhost:3000/api';
	} else {
		apiBaseUrl = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/api`;
	}
	return apiBaseUrl;
}

/** Get the current language from i18next localStorage, defaulting to 'en'. */
function getCurrentLanguage(): string {
	if (typeof window === 'undefined') return 'en';

	const language = localStorage.getItem('language');

	if (language) {
		try {
			const parsed = JSON.parse(language);
			if (parsed?.state?.lang) {
				return parsed.state.lang;
			}
		} catch (err) {
			console.error('Failed to parse language from localStorage', err);
		}
	}

	return 'en';
}

/**
 * Fetch wrapper that attaches the current i18n language as Accept-Language.
 * Use this instead of native `fetch` for all API calls so the server
 * can return localised error messages.
 */
export async function internalFetch(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> {
	const lang = getCurrentLanguage();
	const headers = new Headers(init?.headers as HeadersInit);
	headers.set('Accept-Language', lang);
	headers.set('Content-Type', 'application/json');

	return fetch(`${getServerUrl()}/${input}`, {
		...init,
		headers,
	});
}
