import express from 'express';

import load from './loaders';
import config from './config';

const startServer = () => {
  const app = express();

  load({ app });

  // @ts-ignore
  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is listening on port ${config.port}`);
  });
};

startServer();
