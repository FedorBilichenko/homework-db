import { Router, Request, Response } from 'express';

import { IServices } from '../services';
import { createBadRequestBody } from '../utils';

const router = Router();

const routes = ({
  app,
  services: { orderService },
}: {
  app: Router;
  services: IServices;
}) => {
  app.use('/order', router);

  router.post('/create', async (req: Request, res: Response) => {
    const { order, error } = await orderService.createOrder(req.body);
    res.status(order ? 200 : 400);
    res
      .send(
        order
          ? {
              order,
            }
          : createBadRequestBody({ error })
      )
      .end();
  });

  router.get('/list', async (req: Request, res: Response) => {
    const { orders, error } = await orderService.getOrders();
    res.status(orders ? 200 : 400);
    res
      .send(
        orders
          ? {
              orders,
            }
          : createBadRequestBody({ error })
      )
      .end();
  });
};

export default routes;
