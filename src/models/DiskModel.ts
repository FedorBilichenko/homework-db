import { PoolClient } from 'pg';

import { IDisk, IDiskModel } from '../types';

import BaseModel from './BaseModel';

export default class DiskModel extends BaseModel implements IDiskModel {
  constructor({ pool }: { pool: PoolClient }) {
    super({ pool, table: 'disks' });
  }

  async createDisk({
    name,
    count,
    authorId,
    price,
  }: {
    name: string;
    count: number;
    price: number;
    authorId: number;
  }): Promise<{
    disk: IDisk | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `INSERT INTO ${this.table} (name, count, author_id, price) VALUES($1, $2, $3, $4) RETURNING *;`,
        [name, count, authorId, price]
      );

      const authorRes = await this.pool.query(
        `SELECT * from authors WHERE id = $1`,
        [authorId]
      );

      return {
        disk: {
          ...res.rows[0],
          author: authorRes.rows[0],
        },
        error: null,
      };
    } catch (err) {
      return {
        disk: null,
        error: err.detail,
      };
    }
  }

  async getDisks(): Promise<{
    disks: IDisk[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(`SELECT * FROM ${this.table};`);

      return {
        disks: res.rows,
        error: null,
      };
    } catch (err) {
      return {
        disks: null,
        error: err.detail,
      };
    }
  }

  async removeAll(): Promise<{
    disks: IDisk[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(`DELETE FROM ${this.table};`);

      return {
        disks: res.rows,
        error: null,
      };
    } catch (err) {
      return {
        disks: null,
        error: err.detail,
      };
    }
  }

  async getDisk({
    id,
  }: {
    id: number;
  }): Promise<{ disk: IDisk | null; error: string | null }> {
    try {
      const res = await this.pool.query(
        `SELECT *  from ${this.table} WHERE id = $1`,
        [id]
      );

      return {
        disk: res.rows[0],
        error: res.rows[0] ? null : `Диска с id = ${id} не существует`,
      };
    } catch (err) {
      return {
        disk: null,
        error: err.detail,
      };
    }
  }

  async getDiskByName({
    name,
  }: {
    name: string;
  }): Promise<{ disk: IDisk | null; error: string | null }> {
    try {
      const res = await this.pool.query(
        `SELECT *  from ${this.table} WHERE name = $1`,
        [name]
      );

      return {
        disk: res.rows[0],
        error: res.rows[0] ? null : `Диска с name = ${name} не существует`,
      };
    } catch (err) {
      return {
        disk: null,
        error: err.detail,
      };
    }
  }

  async orderDisk({
    id,
  }: {
    id: number;
  }): Promise<{ error: string | null; disk: IDisk | null }> {
    try {
      const { disk, error } = await this.getDisk({ id });

      if (error || !disk) {
        return {
          error,
          disk: null,
        };
      }

      if (disk.count === 0) {
        return {
          error: `Количество дисков с id = ${id} равно 0`,
          disk: null,
        };
      }

      const res = await this.pool.query(
        `UPDATE ${this.table} SET count = $1 WHERE id = id RETURNING *;`,
        [--disk.count]
      );

      return {
        error: null,
        disk: res.rows[0],
      };
    } catch (err) {
      return {
        error: err.detail,
        disk: null,
      };
    }
  }
}
