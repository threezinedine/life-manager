import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './toggle';
import { SunIcon, MoonIcon } from '@/icons';

// ============================================
// THEME TOGGLE META (interactive)
// ============================================

const ThemeToggleStory: Meta = {
	title: 'Components/Toggle/ThemeToggle',
	parameters: {
		layout: 'centered',
	},
};

export default ThemeToggleStory;
type ThemeStory = StoryObj<typeof ThemeToggleStory>;

export const LightToDark: ThemeStory = {
	render: () => {
		const [theme, setTheme] = useState<'light' | 'dark'>('light');

		const toggleTheme = (checked: boolean) => {
			setTheme(checked ? 'dark' : 'light');
		};

		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '2rem',
				}}
			>
				{/* Preview panel */}
				<div
					className={theme}
					style={{
						width: 480,
						padding: '1.5rem',
						borderRadius: '1rem',
						backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
						border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
						transition: 'background-color 0.3s ease, border-color 0.3s ease',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1.25rem',
						}}
					>
						<h2
							style={{
								margin: 0,
								fontSize: '1.25rem',
								fontWeight: 700,
								color: theme === 'dark' ? '#e5e7eb' : '#111827',
							}}
						>
							Theme Preview
						</h2>
						<p
							style={{
								margin: 0,
								fontSize: '0.875rem',
								color: theme === 'dark' ? '#9ca3af' : '#6b7280',
							}}
						>
							Current theme: <strong>{theme}</strong>
						</p>

						{/* Button row */}
						<div
							style={{
								display: 'flex',
								gap: '0.75rem',
								flexWrap: 'wrap',
							}}
						>
							<button
								style={{
									padding: '0.5rem 1rem',
									background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
									color: '#fff',
									border: 'none',
									borderRadius: '0.5rem',
									fontWeight: 600,
									cursor: 'pointer',
								}}
							>
								Primary
							</button>
							<button
								style={{
									padding: '0.5rem 1rem',
									background: 'transparent',
									color: theme === 'dark' ? '#a5b4fc' : '#6366f1',
									border: `2px solid ${theme === 'dark' ? '#38bdf8' : '#0ea5e9'}`,
									borderRadius: '0.5rem',
									fontWeight: 600,
									cursor: 'pointer',
								}}
							>
								Outline
							</button>
							<button
								style={{
									padding: '0.5rem 1rem',
									background: 'transparent',
									color: theme === 'dark' ? '#a5b4fc' : '#6366f1',
									border: 'none',
									fontWeight: 600,
									cursor: 'pointer',
								}}
							>
								Ghost
							</button>
						</div>

						{/* Toast-like card */}
						<div
							style={{
								padding: '0.875rem 1rem',
								background: theme === 'dark' ? '#064e3b' : '#ecfdf5',
								border: `1px solid ${theme === 'dark' ? '#10b981' : '#10b981'}`,
								borderRadius: '0.5rem',
								display: 'flex',
								alignItems: 'center',
								gap: '0.75rem',
								color: theme === 'dark' ? '#34d399' : '#10b981',
								fontSize: '0.875rem',
							}}
						>
							<span>✓</span>
							<span style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}>
								Changes saved successfully
							</span>
						</div>
					</div>
				</div>

				{/* Toggle control */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.75rem',
						color: theme === 'dark' ? '#9ca3af' : '#6b7280',
						fontSize: '0.875rem',
					}}
				>
					<SunIcon />
					<Toggle
						checked={theme === 'dark'}
						onChange={toggleTheme}
						checkedIcon={<MoonIcon />}
						uncheckedIcon={<SunIcon />}
					/>
					<MoonIcon />
				</div>
			</div>
		);
	},
};
