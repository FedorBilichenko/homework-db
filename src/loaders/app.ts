import { Application, Router } from 'express';
import bodyParser from 'body-parser';

import config from '../config';

const loadApp = ({
  app,
  routes,
}: {
  app: Application;
  routes: () => Router;
}): Application => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get('/status', (req, res) => {
    res.send('status');
    res.status(200).end();
  });
  app.use(config.apiPrefix, routes());

  return app;
};

export default loadApp;
