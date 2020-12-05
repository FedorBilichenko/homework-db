import { Router, Request, Response } from 'express';

import { IServices } from '../services';
import { createBadRequestBody } from '../utils';

const router = Router();

const routes = ({
  app,
  services: { managerService },
}: {
  app: Router;
  services: IServices;
}) => {
  app.use('/manager', router);

  router.post('/create', async (req: Request, res: Response) => {
    const { manager, error } = await managerService.createManager({
      name: req.body.name,
    });
    res.status(manager ? 200 : 400);
    res
      .send(
        manager
          ? {
              manager,
            }
          : createBadRequestBody({ error })
      )
      .end();
  });

  router.get('/list', async (req: Request, res: Response) => {
    const { managers, error } = await managerService.getManagers();
    res.status(managers ? 200 : 400);
    res
      .send(
        managers
          ? {
              managers,
            }
          : null
      )
      .end({ error });
  });

  router.post('/remove_all', async (req: Request, res: Response) => {
    const { managers, error } = await managerService.removeAll();
    res.status(managers ? 200 : 400);
    res.send(managers ? { managers } : createBadRequestBody({ error })).end();
  });

  router.get('/list_with_orders', async (req: Request, res: Response) => {
    const { managers, error } = await managerService.getManagersWithOrders();
    res.status(managers ? 200 : 400);
    res
      .send(
        managers
          ? {
              managers,
            }
          : null
      )
      .end({ error });
  });
};

export default routes;
