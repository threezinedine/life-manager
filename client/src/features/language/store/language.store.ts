import { create } from 'zustand';

export type SupportedLang = 'en' | 'vi';

export interface LanguageState {
	lang: SupportedLang;
	setLang: (lang: SupportedLang) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
	lang: 'en',
	setLang: (lang) => set({ lang }),
}));
