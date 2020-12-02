import { Application } from 'express';

import loadApp from './app';
import loadDb from './db';

const load = async ({ app }: { app: Application }) => {
  loadApp({ app });
  await loadDb();
};

export default load;
