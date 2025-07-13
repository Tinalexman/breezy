module.exports = {
  apps: [
    {
      name: "breezy",
      script: "./breezy",
      args: "-env-file ./.env",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],

  deploy: {
    production: {
      user: "dev",
      host: "168.231.114.50",
      ref: "origin/master",
      repo: "git@github.com:Tinalexman/platoons_backend.git",
      path: "/home/dev/breezy_backend_production",
      "pre-deploy-local": "echo 'Deploying production...'",
      "post-deploy": `GOOS=linux GOARCH=amd64 go build -o breezy && pm2 reload ecosystem.config.js --only breezy --env production`,
      "pre-setup": "",
    },
  },
};
