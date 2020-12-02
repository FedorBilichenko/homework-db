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
  }> {
    const res = await this.pool.query(
      `INSERT INTO ${this.table} (name) VALUES($1) RETURNING *;`,
      [name]
    );

    return {
      author: res.rows[0] || null,
    };
  }

  async getAuthors(): Promise<{
    authors: IAuthor[];
  }> {
    const res = await this.pool.query(`SELECT * FROM ${this.table};`);

    return {
      authors: res.rows,
    };
  }
}
