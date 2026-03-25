import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import { cwd } from 'process';

function loadEnvFile(envFilePath: string): void {
	if (!fs.existsSync(envFilePath)) {
		console.warn(`Environment file ${envFilePath} not found.`);
		return;
	}
	const envContent = fs.readFileSync(envFilePath, 'utf-8');
	envContent.split('\n').forEach((line) => {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) return;
		const eqIndex = trimmed.indexOf('=');
		if (eqIndex === -1) return;
		const key = trimmed.slice(0, eqIndex).trim();
		const value = trimmed.slice(eqIndex + 1).trim();
		if (key) process.env[key] = value;
	});
}

// Load .env first (local dev overrides), then .prod.env as base
loadEnvFile(path.join(__dirname, '.env'));
// loadEnvFile(path.join(__dirname, ".prod.env"));

spawn('npm', ['run', 'dev'], {
	cwd: path.join(cwd(), 'server'),
	stdio: 'inherit',
	shell: true,
});
spawn(
	'npm',
	['run', 'dev', '--', '--port', String(process.env.CLIENT_PORT || 3000)],
	{
		cwd: path.join(cwd(), 'client'),
		stdio: 'inherit',
		shell: true,
	}
);
