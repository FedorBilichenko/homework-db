import { Router, Request, Response } from 'express';

import { IServices } from '../services';

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
    const { manager } = await managerService.createManager({
      name: req.body.name,
    });
    res.status(manager ? 200 : 400);
    res
      .send({
        manager,
      })
      .end();
  });

  router.get('/list', async (req: Request, res: Response) => {
    const { managers } = await managerService.getManagers();
    res.status(200);
    res
      .send({
        managers,
      })
      .end();
  });
};

export default routes;
