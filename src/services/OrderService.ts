import { IDisk, IManager, IOrder } from '../types';

import BaseService from './BaseService';

export default class OrderService extends BaseService {
  async createOrder({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    disk_id,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    manager_id,
  }: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    disk_id: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    manager_id: number;
  }): Promise<{ order: IOrder | null; error: string | null }> {
    const { disk, error: diskError } = await this.models.diskModel.getDisk({
      id: disk_id,
    });

    if (diskError || !disk) {
      return {
        order: null,
        error: diskError,
      };
    }

    if (disk.count === 0) {
      return {
        order: null,
        error: `${disk.name} закончились`,
      };
    }

    const {
      manager,
      error: managerError,
    } = await this.models.managerModel.getManager({
      id: manager_id,
    });

    if (managerError || !manager) {
      return {
        order: null,
        error: managerError,
      };
    }

    const {
      error: orderError,
      order,
    } = await this.models.orderModel.createOrder({
      diskId: disk_id,
      managerId: manager_id,
    });

    if (orderError || !order) {
      return {
        order: null,
        error: orderError,
      };
    }

    const {
      disk: updatedDisk,
      error: updatedDiskError,
    } = await this.models.diskModel.orderDisk({ id: disk_id });

    if (updatedDiskError) {
      return {
        order: null,
        error: updatedDiskError,
      };
    }

    return {
      error: null,
      order: {
        ...order,
        manager: manager as IManager,
        disk: updatedDisk as IDisk,
      },
    };
  }

  async getOrders() {
    return this.models.orderModel.getOrders();
  }
}
