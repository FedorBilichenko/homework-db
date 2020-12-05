import path from 'path';

import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isProd = process.env.NODE_ENV === 'production';

const workDir = path.resolve(__dirname, '../../');

const envFound = dotenv.config({
  path: isProd
    ? path.join(workDir, '.env.production')
    : path.join(workDir, '.env.default'),
});

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  dbHostName: process.env.DB_HOSTNAME,
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbMaxConnections: process.env.DB_MAX_CONNECTIONS
    ? parseInt(process.env.DB_MAX_CONNECTIONS, 10)
    : 10,
  dbPassword: process.env.DB_PASSWORD,

  apiPrefix: '/api',
};

export default config;
