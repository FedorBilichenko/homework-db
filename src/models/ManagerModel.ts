import { PoolClient } from 'pg';

import { IAuthor, IManagerModel } from '../types';

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
  }> {
    const res = await this.pool.query(
      `INSERT INTO ${this.table} (name) VALUES($1) RETURNING *;`,
      [name]
    );

    return {
      manager: res.rows[0] || null,
    };
  }

  async getManagers(): Promise<{
    managers: IAuthor[];
  }> {
    const res = await this.pool.query(`SELECT * FROM ${this.table};`);

    return {
      managers: res.rows,
    };
  }
}
