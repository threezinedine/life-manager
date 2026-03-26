import fs from 'fs';

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

export default loadEnvFile;
