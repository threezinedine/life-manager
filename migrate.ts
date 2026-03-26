import { spawn } from 'child_process';
import loadEnvFile from './export-env';
import path from 'path';
import { cwd } from 'process';

loadEnvFile(path.join(__dirname, '.env'));

spawn('npm', ['run', 'migrate'], {
	cwd: path.join(cwd(), 'server'),
	stdio: 'inherit',
	shell: true,
});
