import { IDisk } from './disk';
import { IManager } from './manager';

export interface IOrder {
  id: number;
  disk: IDisk;
  manager: IManager;
}

export interface IOrderModel {
  // eslint-disable-next-line no-unused-vars
  createOrder(params: {
    diskId: number;
    managerId: number;
  }): Promise<{ order: IOrder | null; error: string | null }>;

  getOrders(): Promise<{ orders: IOrder[] | null; error: string | null }>;
}
