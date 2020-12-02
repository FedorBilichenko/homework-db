import { Router } from 'express';

import { IServices } from '../services';

import authorsRoutes from './author';
import managersRoutes from './manager';

const routes = ({ services }: { services: IServices }) => (): Router => {
  const app = Router();
  authorsRoutes({ app, services });
  managersRoutes({ app, services });

  return app;
};

export default routes;
