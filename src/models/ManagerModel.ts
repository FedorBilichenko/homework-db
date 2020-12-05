import { PoolClient } from 'pg';

import { IAuthor, IManager, IManagerModel } from '../types';

import BaseModel from './BaseModel';

export default class ManagerModel extends BaseModel implements IManagerModel {
  constructor({ pool }: { pool: PoolClient }) {
    super({ pool, table: 'managers' });
  }

  async createManager({
    name,
  }: {
    name: string;
  }): Promise<{
    manager: IAuthor | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `INSERT INTO ${this.table} (name) VALUES($1) RETURNING *;`,
        [name]
      );

      return {
        manager: res.rows[0],
        error: null,
      };
    } catch (err) {
      return {
        manager: null,
        error: err.detail,
      };
    }
  }

  async getManagers(): Promise<{
    managers: IManager[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(`SELECT * FROM ${this.table};`);

      return {
        managers: res.rows,
        error: null,
      };
    } catch (err) {
      return {
        managers: null,
        error: err.detail,
      };
    }
  }

  async getManagersWithOrders(): Promise<{
    managers: IManager[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `SELECT
        ${this.table}.id as manager_id,
        COUNT(${this.table}.id) as orders_count
        FROM managers
        JOIN orders ON ${this.table}.id = orders.manager_id
        GROUP BY ${this.table}.id;
        `
      );

      return {
        managers: res.rows,
        error: null,
      };
    } catch (err) {
      return {
        managers: null,
        error: err.detail,
      };
    }
  }

  async getManager({
    id,
  }: {
    id: number;
  }): Promise<{
    manager: IManager | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `SELECT * FROM ${this.table} WHERE id = $1;`,
        [id]
      );

      return {
        manager: res.rows[0],
        error: res.rows[0] ? null : `Менеджера с id = ${id} не существует`,
      };
    } catch (err) {
      return {
        manager: null,
        error: err.detail,
      };
    }
  }

  async removeAll(): Promise<{
    managers: IManager[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(`DELETE FROM ${this.table};`);

      return {
        managers: res.rows,
        error: null,
      };
    } catch (err) {
      return { managers: null, error: err.detail };
    }
  }
}
