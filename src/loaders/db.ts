import { Pool, PoolClient } from 'pg';

import config from '../config';
import initDb from '../database/init';

const loadDb = async (): Promise<PoolClient | null> => {
  try {
    const pool = new Pool({
      database: config.dbName,
      password: config.dbPassword,
      host: config.dbHostName,
      port: config.dbPort,
      user: config.dbUser,
      max: config.dbMaxConnections,
    });

    const poolClient = await pool.connect();

    await initDb({ pollClient: poolClient });

    return poolClient;
  } catch (err) {
    console.log('initialize db error', err);

    return null;
  }
};

export default loadDb;
