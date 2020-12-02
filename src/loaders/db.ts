import { Pool, PoolClient } from 'pg';

import config from '../config';

const loadDb = async (): Promise<PoolClient> => {
  const pool = new Pool({
    database: config.dbName,
    password: config.dbPassword,
    host: config.dbHostName,
    port: config.dbPort,
    user: config.dbUser,
    max: config.dbMaxConnections,
  });

  return pool.connect();
};

export default loadDb;
