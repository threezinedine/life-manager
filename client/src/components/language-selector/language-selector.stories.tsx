import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LanguageSelector from './language-selector';
import type { SupportedLang } from './language-selector';
import clsx from 'clsx';

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

export const Default: Story = {
	render: () => {
		const [lang, setLang] = useState<SupportedLang>('en');
		return (
			<div
				className="light"
				style={{
					backgroundColor: '#f0f0f0',
					padding: '3rem',
					minHeight: '100vh',
				}}
			>
				<LanguageSelector value={lang} onChange={setLang} />
				<p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
					Selected: <strong>{lang}</strong>
				</p>
			</div>
		);
	},
};

export const Uncontrolled: Story = {
	render: () => (
		<div
			className="light"
			style={{
				backgroundColor: '#f0f0f0',
				padding: '3rem',
				minHeight: '100vh',
			}}
		>
			<LanguageSelector />
			<p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
				Manages its own internal state
			</p>
		</div>
	),
};

export const VietnameseSelected: Story = {
	render: () => {
		const [lang, setLang] = useState<SupportedLang>('vi');
		return (
			<div
				className="light"
				style={{
					backgroundColor: '#f0f0f0',
					padding: '3rem',
					minHeight: '100vh',
				}}
			>
				<LanguageSelector value={lang} onChange={setLang} />
				<p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
					Selected: <strong>{lang}</strong>
				</p>
			</div>
		);
	},
};

export const DarkMode: Story = {
	render: () => {
		const [lang, setLang] = useState<SupportedLang>('en');
		return (
			<div
				className={clsx({ dark: true })}
				style={{
					backgroundColor: '#1f2937',
					color: '#f9fafb',
					padding: '3rem',
					minHeight: '100vh',
				}}
			>
				<LanguageSelector value={lang} onChange={setLang} />
				<p
					style={{
						marginTop: '1rem',
						fontSize: '0.875rem',
						color: '#9ca3af',
					}}
				>
					Selected: <strong>{lang}</strong>
				</p>
			</div>
		);
	},
};
