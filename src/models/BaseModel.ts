import { PoolClient } from 'pg';

export default class BaseModel {
  table: string;
  pool: PoolClient;

  constructor({ table, pool }: { table: string; pool: PoolClient }) {
    this.table = table;
    this.pool = pool;
  }
}
