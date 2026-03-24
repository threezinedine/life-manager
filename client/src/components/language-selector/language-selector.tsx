import { useState, type ReactNode } from 'react';
import DropMenu, { type DropMenuEntry } from '@/components/dropmenu';
import Button from '@/components/button';
import { Variant } from '@/components/button/button.props';
import { Size } from '@/data/props';
import { CheckIcon, UsaFlagIcon, VietnamFlagIcon } from '@/icons';
import styles from './language-selector.module.scss';

export type SupportedLang = 'en' | 'vi';

export interface Language {
	code: SupportedLang;
	label: string;
	icon: ReactNode;
}

export const SUPPORTED_LANGUAGES: Language[] = [
	{ code: 'en', label: 'English', icon: <UsaFlagIcon /> },
	{ code: 'vi', label: 'Tiếng Việt', icon: <VietnamFlagIcon /> },
];

export interface LanguageSelectorProps {
	value?: SupportedLang;
	onChange?: (lang: SupportedLang) => void;
	className?: string;
}

function buildMenuItems(
	lang: SupportedLang,
	onLangChange: (lang: SupportedLang) => void
): DropMenuEntry[] {
	return SUPPORTED_LANGUAGES.map((language) => ({
		label: language.label,
		icon: <span className={styles['lang-icon']}>{language.icon}</span>,
		onClick: () => onLangChange(language.code),
		...(language.code === lang && {
			shortcut: <CheckIcon />,
		}),
	})) as DropMenuEntry[];
}

export default function LanguageSelector({
	value,
	onChange,
	className,
}: LanguageSelectorProps) {
	const [internalLang, setInternalLang] = useState<SupportedLang>('en');
	const lang = value ?? internalLang;
	const handleLangChange = (newLang: SupportedLang) => {
		setInternalLang(newLang);
		onChange?.(newLang);
	};

	const items = buildMenuItems(lang, handleLangChange);

	return (
		<DropMenu items={items} align="right" className={className}>
			<Button
				variant={Variant.Ghost}
				size={Size.Small}
				leftIcon={
					<span className={styles['lang-icon']}>
						{SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.icon}
					</span>
				} // show the icon of the currently selected language
				aria-label="Select language"
			/>
		</DropMenu>
	);
}
