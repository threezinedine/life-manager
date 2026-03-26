import { spawn } from 'child_process';
import loadEnvFile from './export-env';
import path from 'path';
import { cwd } from 'process';

loadEnvFile(path.join(__dirname, '.env'));

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
