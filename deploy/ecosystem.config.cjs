// PM2 process file: keeps the site running and restarts it if it crashes.
module.exports = {
  apps: [
    {
      name: 'ai742',
      cwd: '/var/www/ai742',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000 -H 127.0.0.1',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '700M',
      instances: 1, // SQLite: run a single instance
    },
  ],
}
