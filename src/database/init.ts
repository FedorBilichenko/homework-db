import { PoolClient } from 'pg';

const initQueries = {
  createAuthorsTable: `
    CREATE TABLE IF NOT EXISTS authors (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
  `,
  createManagersTable: `
    CREATE TABLE IF NOT EXISTS managers (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
  `,
  createDisksTable: `
    CREATE TABLE IF NOT EXISTS disks (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      count INT NOT NULL,
      price NUMERIC(19, 2) NOT NULL,
      author_id BIGINT NOT NULL REFERENCES authors(id)
    );
  `,
  createOrdersTable: `
    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      disk_id BIGINT NOT NULL REFERENCES disks(id),
      manager_id BIGINT REFERENCES managers(id)
    );
  `,
};

const initQueriesOrder = [
  initQueries.createAuthorsTable,
  initQueries.createManagersTable,
  initQueries.createDisksTable,
  initQueries.createOrdersTable,
];

const initDb = async ({ pollClient }: { pollClient: PoolClient }) => {
  try {
    await Promise.all(initQueriesOrder.map((query) => pollClient.query(query)));
  } catch (error) {
    console.log('initDb error', error);
  }
};

export default initDb;
