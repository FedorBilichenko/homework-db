import { PoolClient } from 'pg';

import { IOrder, IOrderModel } from '../types';

import BaseModel from './BaseModel';

export default class OrderModel extends BaseModel implements IOrderModel {
  constructor({ pool }: { pool: PoolClient }) {
    super({ pool, table: 'orders' });
  }

  async createOrder({
    diskId,
    managerId,
  }: {
    diskId: number;
    managerId: number;
  }): Promise<{ order: IOrder | null; error: string | null }> {
    try {
      const res = await this.pool.query(
        `INSERT INTO ${this.table} (disk_id, manager_id) VALUES($1, $2) RETURNING *;`,
        [diskId, managerId]
      );

      return {
        order: {
          ...res.rows[0],
        },
        error: null,
      };
    } catch (err) {
      return {
        order: null,
        error: err.detail,
      };
    }
  }

  async getOrders(): Promise<{
    orders: IOrder[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `SELECT
          ${this.table}.id as id,
          disks.id as disk_id,
          managers.id as manager_id,
          disks.name as disk_name,
          managers.name as manager_name
          FROM ${this.table}
          JOIN disks ON ${this.table}.disk_id = disks.id
          JOIN managers ON ${this.table}.manager_id = managers.id;`
      );

      return {
        orders: res.rows,
        error: null,
      };
    } catch (err) {
      return {
        orders: null,
        error: err.detail,
      };
    }
  }
}
