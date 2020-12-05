import { Application } from 'express';

import initModels from '../models';
import initServices from '../services';
import routes from '../routes';
import { BaseResp } from '../types';

import loadApp from './app';
import loadDb from './db';

const load = async ({ app }: { app: Application }): Promise<BaseResp> => {
  const pool = await loadDb();

  if (!pool) {
    return {
      isError: true,
    };
  }

  const models = initModels({ pool });

  const services = initServices(models);

  loadApp({ app, routes: routes({ services }) });

  return {
    isError: false,
  };
};

export default load;
