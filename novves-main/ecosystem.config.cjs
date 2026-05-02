const path = require("path");

/** PM2: Next.js üretim sunucusu (sunucuda `npm run build` sonrası) */
module.exports = {
  apps: [
    {
      name: "novves",
      cwd: __dirname,
      script: path.join(
        __dirname,
        "node_modules",
        "next",
        "dist",
        "bin",
        "next",
      ),
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || "3000",
      },
    },
  ],
};
