import { spawn } from 'child_process';
import loadEnvFile from './export-env';
import path from 'path';
import { cwd } from 'process';

loadEnvFile(path.join(__dirname, '.env'));

const useUI = process.argv.includes('--ui');
const cypressCmd = useUI ? 'open' : 'run';

spawn('npm', ['run', `cypress:${cypressCmd}`], {
	cwd: path.join(cwd(), 'client'),
	stdio: 'inherit',
	shell: true,
});
