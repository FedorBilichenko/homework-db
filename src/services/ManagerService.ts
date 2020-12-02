import { IManager, IManagerModel } from '../types';

import BaseService from './BaseService';

export default class ManagerService extends BaseService<IManagerModel> {
  constructor({ model }: { model: IManagerModel }) {
    super({ model });
  }

  async createManager({ name }: { name: string }) {
    return this.model.createManager({ name });
  }

  async getManagers(): Promise<{ managers: IManager[] }> {
    return this.model.getManagers();
  }
}
