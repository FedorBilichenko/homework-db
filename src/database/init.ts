import { PoolClient } from 'pg';

const initData = [
  `INSERT INTO authors (name) VALUES('Автор1');`,
  `INSERT INTO authors (name) VALUES('Автор2');`,
  `INSERT INTO authors (name) VALUES('Автор3');`,
  `INSERT INTO authors (name) VALUES('Автор4');`,
  `INSERT INTO disks (name, count, author_id, price) VALUES('Диск1', 10, 1, 10000);`,
  `INSERT INTO disks (name, count, author_id, price) VALUES('Диск2', 5, 1, 1000);`,
  `INSERT INTO disks (name, count, author_id, price) VALUES('Диск3', 5, 2, 5000);`,
  `INSERT INTO disks (name, count, author_id, price) VALUES('Диск4', 5, 3, 20000);`,
  `INSERT INTO managers (name) VALUES('Менеджер1');`,
  `INSERT INTO managers (name) VALUES('Менеджер2');`,
  `INSERT INTO managers (name) VALUES('Менеджер3');`,
  `INSERT INTO managers (name) VALUES('Менеджер4');`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(1, 1);`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(2, 1);`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(3, 1);`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(1, 2);`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(1, 3);`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(4, 2);`,
  `INSERT INTO orders (disk_id, manager_id) VALUES(2, 1);`,
];

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
    await Promise.all(initData.map((query) => pollClient.query(query)));
  } catch (error) {
    console.log('initDb error', error);
  }
};

export default initDb;
