import { Router, Request, Response } from 'express';

import { IServices } from '../services';

const router = Router();

const routes = ({
  app,
  services: { authorService },
}: {
  app: Router;
  services: IServices;
}) => {
  app.use('/author', router);

  router.post('/create', async (req: Request, res: Response) => {
    const { author } = await authorService.createAuthor({
      name: req.body.name,
    });
    res.status(author ? 200 : 400);
    res
      .send({
        author,
      })
      .end();
  });

  router.get('/list', async (req: Request, res: Response) => {
    const { authors } = await authorService.getAuthors();
    res.status(200);
    res
      .send({
        authors,
      })
      .end();
  });
};

export default routes;
