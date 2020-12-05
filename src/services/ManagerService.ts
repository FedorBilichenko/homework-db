import BaseService from './BaseService';

export default class ManagerService extends BaseService {
  async createManager({ name }: { name: string }) {
    return this.models.managerModel.createManager({ name });
  }

  async getManagers() {
    return this.models.managerModel.getManagers();
  }

  async getManagersWithOrders() {
    return this.models.managerModel.getManagersWithOrders();
  }

  async removeAll() {
    return this.models.managerModel.removeAll();
  }
}
