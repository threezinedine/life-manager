import fs from "fs";
import { spawn } from "child_process";
import path from "path";

// Load environment variables from .prod.env
const envFilePath = path.join(__dirname, ".prod.env");
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) return;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key) process.env[key] = value;
  });
} else {
  console.warn(`Environment file ${envFilePath} not found.`);
}

// Start both client and server concurrently
spawn("npm", ["run", "server"], { stdio: "inherit", shell: true });
spawn("npm", ["run", "client"], { stdio: "inherit", shell: true });
