import { spawn } from 'child_process';
import loadEnvFile from './export-env';
import path from 'path';
import { cwd } from 'process';

loadEnvFile(path.join(__dirname, '.env'));

spawn('npm', ['run', 'storybook'], {
	cwd: path.join(cwd(), 'client'),
	stdio: 'inherit',
	shell: true,
});
