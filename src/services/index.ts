import { IModels } from '../models';

import AuthorService from './AuthorService';
import ManagerService from './ManagerService';

export interface IServices {
  authorService: AuthorService;
  managerService: ManagerService;
}

const initServices = ({ authorModel, managerModel }: IModels): IServices => {
  const authorService = new AuthorService({ model: authorModel });
  const managerService = new ManagerService({ model: managerModel });

  return {
    authorService,
    managerService,
  };
};

export default initServices;
