import { Application } from 'express';
import bodyParser from 'body-parser';

const loadApp = ({ app }: { app: Application }): Application => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get('/status', (req, res) => {
    res.send('status');
    res.status(200).end();
  });

  return app;
};

export default loadApp;
