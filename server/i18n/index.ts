import { en } from './messages/en';
import { vi } from './messages/vi';

export type Locale = 'en' | 'vi';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'vi'];

export const messages = { en, vi } as const;

export type MessageKey = keyof (typeof messages)['en'];

/**
 * Detect locale from Accept-Language header.
 * Returns 'en' as fallback.
 */
export function detectLocale(acceptLanguage: string | undefined): Locale {
	if (!acceptLanguage) return 'en';

	// Parse each segment into { lang, quality }
	const candidates = acceptLanguage
		.split(',')
		.map((part) => {
			const [lang, q = 'q=1'] = part.trim().split(';');
			const quality = parseFloat(q.replace('q=', ''));
			return { lang: lang.trim().split('-')[0].toLowerCase(), quality };
		});

	// Sort by quality descending, then prefer supported locales when quality ties
	candidates.sort((a, b) => {
		if (b.quality !== a.quality) return b.quality - a.quality;
		const aSupported = SUPPORTED_LOCALES.includes(a.lang as Locale) ? 1 : 0;
		const bSupported = SUPPORTED_LOCALES.includes(b.lang as Locale) ? 1 : 0;
		return bSupported - aSupported;
	});

	const top = candidates[0];
	return SUPPORTED_LOCALES.includes(top.lang as Locale)
		? (top.lang as Locale)
		: 'en';
}

/**
 * Get a translated message by dot-notation key.
 * e.g. t('auth.emailAlreadyRegistered', 'vi')
 */
export function t(key: string, locale: Locale = 'en'): string {
	const parts = key.split('.');
	let value: unknown = messages[locale];

	for (const part of parts) {
		if (value && typeof value === 'object' && part in value) {
			value = (value as Record<string, unknown>)[part];
		} else {
			// Fallback to English
			value = messages['en'];
			for (const p of parts) {
				if (value && typeof value === 'object' && p in value) {
					value = (value as Record<string, unknown>)[p];
				} else {
					return key; // Return key if not found
				}
			}
			break;
		}
	}

	return typeof value === 'string' ? value : key;
}
