// execute docker-compose down to stop and remove containers, networks, and volumes
const { spawn } = require("child_process");

let dockerCommand = "";

if (process.platform === "win32") {
  dockerCommand = "docker-compose";
} else if (process.platform === "linux") {
  dockerCommand = "docker compose";
}

spawn(`${dockerCommand} down`, {
  stdio: "inherit",
  shell: true,
});
