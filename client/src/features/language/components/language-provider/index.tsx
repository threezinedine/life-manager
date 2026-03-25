import { useEffect } from 'react';
import i18n from '@/features/language/i18n';
import { useLanguageStore } from '../../store/language.store';

interface LanguageProviderProps {
	children: React.ReactNode;
}

const STORAGE_KEY = 'language';

// Bootstrap i18n language from localStorage synchronously before first paint.
const storedLang = localStorage.getItem(STORAGE_KEY) as string | null;
if (storedLang === 'en' || storedLang === 'vi') {
	i18n.changeLanguage(storedLang);
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
	const lang = useLanguageStore((state) => state.lang);

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang]);

	return <>{children}</>;
}
