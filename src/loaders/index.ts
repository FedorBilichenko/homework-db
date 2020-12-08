import { Application } from 'express';

import initModels from '../models';
import initServices, { IServices } from '../services';
import routes from '../routes';
import { BaseResp } from '../types';

import loadApp from './app';
import loadDb from './db';

const load = async ({
  app,
}: {
  app: Application;
}): Promise<BaseResp & { services: IServices | null }> => {
  const pool = await loadDb();

  if (!pool) {
    return {
      isError: true,
      services: null,
    };
  }

  const models = initModels({ pool });

  const services = initServices(models);

  loadApp({ app, routes: routes({ services }) });

  return {
    isError: false,
    services,
  };
};

export default load;
