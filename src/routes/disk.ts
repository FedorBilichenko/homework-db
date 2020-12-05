import { Router, Request, Response } from 'express';

import { IServices } from '../services';
import { createBadRequestBody } from '../utils';

const router = Router();

const routes = ({
  app,
  services: { diskService },
}: {
  app: Router;
  services: IServices;
}) => {
  app.use('/disk', router);

  router.post('/create', async (req: Request, res: Response) => {
    const { disk, error } = await diskService.createDisk(req.body);
    res.status(disk ? 200 : 400);
    res.send(disk ? { disk } : createBadRequestBody({ error })).end();
  });

  router.get('/get', async (req: Request, res: Response) => {
    const { disk, error } = await diskService.getDisk(req.body);
    res.status(disk ? 200 : 400);
    res.send(disk ? { disk } : createBadRequestBody({ error })).end();
  });

  router.get('/get_by_name', async (req: Request, res: Response) => {
    const { disk, error } = await diskService.getDiskByName(req.body);
    res.status(disk ? 200 : 400);
    res.send(disk ? { disk } : createBadRequestBody({ error })).end();
  });

  router.get('/list', async (req: Request, res: Response) => {
    const { disks, error } = await diskService.getDisks();
    res.status(disks ? 200 : 400);
    res.send(disks ? { disks } : createBadRequestBody({ error })).end();
  });

  router.post('/remove_all', async (req: Request, res: Response) => {
    const { disks, error } = await diskService.removeAll();
    res.status(disks ? 200 : 400);
    res.send(disks ? { disks } : createBadRequestBody({ error })).end();
  });
};

export default routes;
