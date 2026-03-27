import { describe, it, expect } from 'vitest';
import { detectLocale, t, SUPPORTED_LOCALES } from './index';

describe('detectLocale', () => {
	it('returns en when no header is provided', () => {
		expect(detectLocale(undefined)).toBe('en');
	});

	it('returns en when header is empty', () => {
		expect(detectLocale('')).toBe('en');
	});

	it('returns vi when header contains Vietnamese', () => {
		expect(detectLocale('vi')).toBe('vi');
		expect(detectLocale('vi-VN')).toBe('vi');
		expect(detectLocale('vi;q=1')).toBe('vi');
	});

	it('returns en when header contains only unsupported locales', () => {
		expect(detectLocale('fr')).toBe('en');
		expect(detectLocale('de-DE')).toBe('en');
	});

	it('prefers higher quality value when multiple locales are listed', () => {
		expect(detectLocale('en;q=0.9, vi;q=1')).toBe('vi');
		expect(detectLocale('fr;q=0.5, en;q=0.8')).toBe('en');
	});

	it('returns the most preferred supported locale', () => {
		expect(detectLocale('vi;q=0.5,en;q=1')).toBe('en');
	});
});

describe('t()', () => {
	it('returns the correct English message for auth errors', () => {
		expect(t('auth.emailAlreadyRegistered', 'en')).toBe('Email already registered');
		expect(t('auth.invalidToken', 'en')).toBe('Invalid token');
	});

	it('returns the correct Vietnamese message for auth errors', () => {
		expect(t('auth.emailAlreadyRegistered', 'vi')).toBe('Email đã được đăng ký');
		expect(t('auth.invalidToken', 'vi')).toBe('Token không hợp lệ');
	});

	it('returns the correct English message for validation errors', () => {
		expect(t('validation.invalidEmail', 'en')).toBe('Invalid email address');
		expect(t('validation.nameRequired', 'en')).toBe('Name is required');
		expect(t('validation.invalidTokenFormat', 'en')).toBe('Invalid token format');
		expect(t('validation.invalidRequest', 'en')).toBe('Invalid request');
	});

	it('returns the correct Vietnamese message for validation errors', () => {
		expect(t('validation.invalidEmail', 'vi')).toBe('Địa chỉ email không hợp lệ');
		expect(t('validation.nameRequired', 'vi')).toBe('Tên không được để trống');
		expect(t('validation.invalidTokenFormat', 'vi')).toBe('Định dạng token không hợp lệ');
		expect(t('validation.invalidRequest', 'vi')).toBe('Yêu cầu không hợp lệ');
	});

	it('falls back to English when locale key is not found', () => {
		expect(t('auth.emailAlreadyRegistered')).toBe('Email already registered');
	});

	it('returns the key itself when the key is not found in any locale', () => {
		expect(t('auth.unknownKey', 'vi')).toBe('auth.unknownKey');
	});

	it('defaults to en when locale is unsupported', () => {
		// @ts-expect-error — testing runtime fallback
		expect(t('auth.emailAlreadyRegistered', 'fr')).toBe('Email already registered');
	});
});

describe('SUPPORTED_LOCALES', () => {
	it('contains en and vi', () => {
		expect(SUPPORTED_LOCALES).toContain('en');
		expect(SUPPORTED_LOCALES).toContain('vi');
		expect(SUPPORTED_LOCALES).toHaveLength(2);
	});
});
