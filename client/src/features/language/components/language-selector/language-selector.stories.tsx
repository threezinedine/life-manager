import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LanguageSelector from './language-selector';
import { useLanguageStore, LanguageProvider } from '@/features/language';
import { useTranslation } from 'react-i18next';

const meta: Meta<typeof LanguageSelector> = {
	title: 'Components/LanguageSelector',
	component: LanguageSelector,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

function LanguageStory({
	dark = false,
	viAtDefault = false,
}: {
	dark?: boolean;
	viAtDefault?: boolean;
}) {
	const lang = useLanguageStore((s) => s.lang);
	const setLang = useLanguageStore((s) => s.setLang);
	const { t } = useTranslation();

	useEffect(() => {
		if (viAtDefault) setLang('vi');
	}, [viAtDefault, setLang]);

	return (
		<div
			className={dark ? 'dark' : 'light'}
			style={{
				backgroundColor: dark ? '#1f2937' : '#f0f0f0',
				color: dark ? '#f9fafb' : '#333',
				padding: '3rem',
				minHeight: '100vh',
			}}
		>
			<LanguageSelector />
			<p
				style={{
					marginTop: '1rem',
					fontSize: '0.875rem',
					color: dark ? '#9ca3af' : '#6b7280',
				}}
			>
				Selected: <strong>{lang}</strong>
			</p>
			<div>{t('home.welcome')}</div>
		</div>
	);
}

export const Default: Story = {
	render: () => (
		<LanguageProvider>
			<LanguageStory />
		</LanguageProvider>
	),
};

export const VietnameseSelected: Story = {
	render: () => (
		<LanguageProvider>
			<LanguageStory viAtDefault />
		</LanguageProvider>
	),
};

export const DarkMode: Story = {
	render: () => (
		<LanguageProvider>
			<LanguageStory dark />
		</LanguageProvider>
	),
};
