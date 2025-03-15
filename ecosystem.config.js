module.exports = {
  apps: [
    {
      name: 'fast-tiny-midway',
      script: './bootstrap.js',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      instances: 1,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
