import { Router } from 'express';

import { IServices } from '../services';

import authorsRoutes from './author';
import managersRoutes from './manager';
import disksRoutes from './disk';
import ordersRoutes from './order';

const routes = ({ services }: { services: IServices }) => (): Router => {
  const app = Router();
  authorsRoutes({ app, services });
  managersRoutes({ app, services });
  disksRoutes({ app, services });
  ordersRoutes({ app, services });

  return app;
};

export default routes;
