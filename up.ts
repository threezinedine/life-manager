import { spawn } from "child_process";
import path from "path";

const dockerCmd = process.platform === "win32" ? "docker-compose" : "docker";
const envFile = path.join(__dirname, ".prod.env");

spawn(dockerCmd, ["compose", "--env-file", envFile, "up", "--build"], {
  stdio: "inherit",
});
