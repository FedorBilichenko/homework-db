import { Application } from 'express';

import initModels from '../models';
import initServices from '../services';
import routes from '../routes';

import loadApp from './app';
import loadDb from './db';

const load = async ({ app }: { app: Application }) => {
  const pool = await loadDb();

  const models = initModels({ pool });
  const services = initServices(models);

  loadApp({ app, routes: routes({ services }) });
};

export default load;
