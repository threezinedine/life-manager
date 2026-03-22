import { spawn } from "child_process";

const dockerCmd = process.platform === "win32" ? "docker-compose" : "docker";

spawn(dockerCmd, ["compose", "down"], {
  stdio: "inherit",
});
