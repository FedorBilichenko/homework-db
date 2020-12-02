import { Pool, PoolClient } from 'pg';

import config from '../config';
import initDb from '../database/init';

const loadDb = async (): Promise<PoolClient> => {
  const pool = new Pool({
    database: config.dbName,
    password: config.dbPassword,
    host: config.dbHostName,
    port: config.dbPort,
    user: config.dbUser,
    max: config.dbMaxConnections,
  });

  const client = await pool.connect();

  await initDb({ pollClient: client });

  return client;
};

export default loadDb;
