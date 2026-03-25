import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SupportedLang = 'en' | 'vi';

export interface LanguageState {
	lang: SupportedLang;
	setLang: (lang: SupportedLang) => void;
}

export const useLanguageStore = create<LanguageState>()(
	persist(
		(set) => ({
			lang: 'en',
			setLang: (lang) => set({ lang }),
		}),
		{
			name: 'language',
		}
	)
);
