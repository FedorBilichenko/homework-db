import { PoolClient } from 'pg';

import { IAuthorModel, IDiskModel, IManagerModel, IOrderModel } from '../types';

import AuthorModel from './AuthorModel';
import DiskModel from './DiskModel';
import ManagerModel from './ManagerModel';
import OrderModel from './OrderModel';

export interface IModels {
  authorModel: IAuthorModel;
  managerModel: IManagerModel;
  diskModel: IDiskModel;
  orderModel: IOrderModel;
}

const initModels = ({ pool }: { pool: PoolClient }): IModels => {
  const authorModel = new AuthorModel({ pool });
  const managerModel = new ManagerModel({ pool });
  const diskModel = new DiskModel({ pool });
  const orderModel = new OrderModel({ pool });

  return {
    authorModel,
    managerModel,
    diskModel,
    orderModel,
  };
};

export default initModels;
