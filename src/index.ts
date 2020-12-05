import express from 'express';

import load from './loaders';
import config from './config';

const startServer = async () => {
  const app = express();

  const { isError } = await load({ app });

  if (isError) {
    process.exit(1);
  }

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
