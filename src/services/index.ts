import { IModels } from '../models';

import AuthorService from './AuthorService';
import DiskService from './DiskService';
import ManagerService from './ManagerService';
import OrderService from './OrderService';

export interface IServices {
  authorService: AuthorService;
  managerService: ManagerService;
  diskService: DiskService;
  orderService: OrderService;
}

const initServices = (models: IModels): IServices => {
  const authorService = new AuthorService({ models });
  const managerService = new ManagerService({ models });
  const diskService = new DiskService({ models });
  const orderService = new OrderService({ models });

  return {
    authorService,
    managerService,
    diskService,
    orderService,
  };
};

export default initServices;
