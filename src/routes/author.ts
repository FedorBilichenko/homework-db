import { Router, Request, Response } from 'express';

import { IServices } from '../services';
import { createBadRequestBody } from '../utils';

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
    const { author, error } = await authorService.createAuthor({
      name: req.body.name,
    });
    res.status(author ? 200 : 400);
    res
      .send(
        author
          ? {
              author,
            }
          : createBadRequestBody({ error })
      )
      .end();
  });

  router.get('/list', async (req: Request, res: Response) => {
    const { authors, error } = await authorService.getAuthors();
    res.status(authors ? 200 : 400);
    res
      .send(
        authors
          ? {
              authors,
            }
          : createBadRequestBody({ error })
      )
      .end();
  });

  router.post('/remove_all', async (req: Request, res: Response) => {
    const { authors, error } = await authorService.removeAll();
    res.status(authors ? 200 : 400);
    res.send(authors ? { authors } : createBadRequestBody({ error })).end();
  });
};

export default routes;
