import DropMenu, { type DropMenuEntry } from '@/components/dropmenu';
import Button from '@/components/button';
import { Variant } from '@/components/button/button.props';
import { Size } from '@/data/props';
import { CheckIcon, UsaFlagIcon, VietnamFlagIcon } from '@/icons';
import { useLanguageStore, type SupportedLang } from '@/features/language';
import styles from './language-selector.module.scss';

const FLAG_ICONS: Record<SupportedLang, React.ReactNode> = {
	en: <UsaFlagIcon />,
	vi: <VietnamFlagIcon />,
};

export function buildMenuItems(
	lang: SupportedLang,
	onLangChange: (lang: SupportedLang) => void,
): DropMenuEntry[] {
	const languages: { code: SupportedLang; labelKey: string }[] = [
		{ code: 'en', labelKey: 'English' },
		{ code: 'vi', labelKey: 'Tiếng Việt' },
	];

	return languages.map((language) => ({
		label: language.labelKey,
		icon: (
			<span className={styles['lang-icon']}>
				{FLAG_ICONS[language.code]}
			</span>
		),
		onClick: () => onLangChange(language.code),
		...(language.code === lang && {
			shortcut: <CheckIcon />,
		}),
	})) as DropMenuEntry[];
}

export default function LanguageSelector({ className }: { className?: string }) {
	const lang = useLanguageStore((state) => state.lang);
	const setLang = useLanguageStore((state) => state.setLang);

	const items = buildMenuItems(lang, setLang);

	return (
		<DropMenu items={items} align="right" className={className}>
			<Button
				variant={Variant.Ghost}
				size={Size.Small}
				leftIcon={
					<span className={styles['lang-icon']}>
						{FLAG_ICONS[lang]}
					</span>
				}
				ariaLabel="Select language"
				testId="language-selector"
			/>
		</DropMenu>
	);
}

export type { SupportedLang };
