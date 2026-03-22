import fs from "fs";
import { spawn } from "child_process";

// Load environment variables from .prod.env
const envFilePath = ".prod.env";
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  const envLines = envContent.split("\n");
  envLines.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} else {
  console.warn(`Environment file ${envFilePath} not found.`);
}

// Start both client and server concurrently
spawn("npm", ["run", "server"], { stdio: "inherit", shell: true });
spawn("npm", ["run", "client"], { stdio: "inherit", shell: true });
