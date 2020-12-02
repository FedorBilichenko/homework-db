import express from 'express';

import load from './loaders';
import config from './config';

const startServer = () => {
  const app = express();

  load({ app });

  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
};

startServer();
