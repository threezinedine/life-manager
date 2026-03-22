const fs = require('fs');
const { spawn } = require('child_process');

const env = fs.readFileSync('.env', 'utf8');
env.split('\n')
  .filter(l => l.trim() && !l.trim().startsWith('#'))
  .forEach(l => {
    const idx = l.indexOf('=');
    const key = l.substring(0, idx);
    const val = l.substring(idx + 1).replace(/^["']|["']$/g, '');
    process.env[key] = val;
  });

spawn('npx', ['concurrently --kill-others-on-fail --raw "npm run server" "npm run client"'], {
  stdio: 'inherit',
  shell: true,
});
