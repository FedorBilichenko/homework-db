import readline, { Interface } from 'readline';

import { IServices } from './services';

const mapFunctions = {
  1: async ({ services }: { rl: Interface; services: IServices }) => {
    const { authors } = await services.authorService.getAuthors();

    console.log('Авторы', JSON.stringify(authors, null, 4));
  },
  2: async ({ services }: { rl: Interface; services: IServices }) => {
    const { disks } = await services.diskService.getDisks();

    console.log('Диски', JSON.stringify(disks, null, 4));
  },
  3: async ({ services }: { rl: Interface; services: IServices }) => {
    const { managers } = await services.managerService.getManagers();

    console.log('Менеджеры', JSON.stringify(managers, null, 4));
  },
  4: async ({ services }: { rl: Interface; services: IServices }) => {
    const { managers } = await services.managerService.getManagersWithOrders();

    console.log('Менеджеры с заказами', JSON.stringify(managers, null, 4));
  },
  5: async ({ services }: { rl: Interface; services: IServices }) => {
    const { orders } = await services.orderService.getOrders();

    console.log('Заказы', JSON.stringify(orders, null, 4));
  },
  6: async ({ rl, services }: { rl: Interface; services: IServices }) => {
    const diskId = await ((): Promise<number> =>
      new Promise((resolve) => {
        rl.question(`Введите id диска: `, (diskId) => {
          resolve(Number(diskId));
        });
      }))();

    const { disk } = await services.diskService.getDisk({
      id: Number(diskId) || 0,
    });

    console.log('Диск ', JSON.stringify(disk, null, 4));
  },
  7: async ({ rl, services }: { rl: Interface; services: IServices }) => {
    const diskName = await ((): Promise<string> =>
      new Promise((resolve) => {
        rl.question(`Введите название дисков: `, (name) => {
          resolve(name);
        });
      }))();

    const { disk } = await services.diskService.getDiskByName({
      name: diskName,
    });

    console.log('Диски ', JSON.stringify(disk, null, 4));
  },
  8: async ({ rl, services }: { rl: Interface; services: IServices }) => {
    const diskName = await ((): Promise<string> =>
      new Promise((resolve) => {
        rl.question(`Введите название дисков: `, (name) => {
          resolve(name);
        });
      }))();

    const price = await ((): Promise<string> =>
      new Promise((resolve) => {
        rl.question(`Введите цену, которые готовы заплатить: `, (price) => {
          resolve(price);
        });
      }))();

    const authorId = await ((): Promise<string> =>
      new Promise((resolve) => {
        rl.question(`Введите id автора: `, (id) => {
          resolve(id);
        });
      }))();

    const { disks } = await services.diskService.getDisksByParams({
      name: diskName,
      price,
      authorId,
    });

    console.log('Диски ', JSON.stringify(disks, null, 4));
  },
  10: ({ rl }: { rl: Interface; services: IServices }) => {
    rl.close();
  },
};

const startQuestion = async ({ services }: { services: IServices }) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // rl.on('close', function () {
  //   console.log('\nКонец.');
  //   process.exit(0);
  // });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const digit = await ((): Promise<string> =>
      new Promise((resolve) => {
        rl.question(
          `Выбери номер действия:
      1. Посмотреть список авторов
      2. Посмотреть список дисков
      3. Посмотреть список менеджеров
      4. Посмотреть список менеджеров с заказами
      5. Посмотреть список заказов
      6. Найти диск по id
      7. Найти диски по названию
      8. Найти диски по названию, доступным деньгам и автору
      10. Выйти\n`,
          (number) => {
            resolve(number);
          }
        );
      }))();

    if (!['1', '2', '3', '4', '5', '6', '7', '8', '10'].includes(digit)) {
      continue;
    }
    // @ts-ignore
    const func = mapFunctions[digit];

    await func({ rl, services });
  }
};

export default startQuestion;
