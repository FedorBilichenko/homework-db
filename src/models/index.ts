import { PoolClient } from 'pg';

import AuthorModel from './AuthorModel';
import ManagerModel from './ManagerModel';

export interface IModels {
  authorModel: AuthorModel;
  managerModel: ManagerModel;
}

const initModels = ({ pool }: { pool: PoolClient }): IModels => {
  const authorModel = new AuthorModel({ pool });
  const managerModel = new ManagerModel({ pool });

  return {
    authorModel,
    managerModel,
  };
};

export default initModels;
