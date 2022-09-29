module.exports = {
  apps: [
    {
      name: "server",
      script: "node_modules/.bin/ts-node",
      args: "-T -r tsconfig-paths/register ./src/index.ts",
      exec_mode: "cluster",
      instances: 0,
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};
