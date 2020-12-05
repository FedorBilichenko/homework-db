import { PoolClient } from 'pg';

import { IAuthor, IAuthorModel } from '../types';

import BaseModel from './BaseModel';

export default class AuthorModel extends BaseModel implements IAuthorModel {
  constructor({ pool }: { pool: PoolClient }) {
    super({ table: 'authors', pool });
  }

  async createAuthor({
    name,
  }: {
    name: string;
  }): Promise<{
    author: IAuthor | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `INSERT INTO ${this.table} (name) VALUES($1) RETURNING *;`,
        [name]
      );

      return {
        author: res.rows[0] || null,
        error: null,
      };
    } catch (err) {
      return {
        author: null,
        error: err.detail,
      };
    }
  }

  async getAuthors(): Promise<{
    authors: IAuthor[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(`SELECT * FROM ${this.table};`);

      return {
        authors: res.rows,
        error: null,
      };
    } catch (err) {
      return { authors: null, error: err.detail };
    }
  }

  async getAuthor({
    id,
  }: {
    id: number;
  }): Promise<{
    author: IAuthor | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(
        `SELECT * FROM ${this.table} WHERE id = $1;`,
        [id]
      );

      return {
        author: res.rows[0],
        error: null,
      };
    } catch (err) {
      return {
        author: null,
        error: err.detail,
      };
    }
  }

  async removeAll(): Promise<{
    authors: IAuthor[] | null;
    error: string | null;
  }> {
    try {
      const res = await this.pool.query(`DELETE FROM ${this.table};`);

      return {
        authors: res.rows,
        error: null,
      };
    } catch (err) {
      return { authors: null, error: err.detail };
    }
  }
}
