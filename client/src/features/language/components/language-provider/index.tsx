import { useEffect } from 'react';
import i18n from '@/features/language/i18n';
import { useLanguageStore } from '../../store/language.store';

interface LanguageProviderProps {
	children: React.ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
	const lang = useLanguageStore((state) => state.lang);

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang]);

	return <>{children}</>;
}
