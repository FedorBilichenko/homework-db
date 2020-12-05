import { IAuthor } from './author';

export interface IDisk {
  id: number;
  name: string;
  count: number;
  price: number;
  author: IAuthor;
}

export interface IDiskModel {
  // eslint-disable-next-line no-unused-vars
  createDisk(params: {
    name: string;
    count: number;
    price: number;
    authorId: number;
  }): Promise<{ disk: IDisk | null; error: string | null }>;

  getDisks(): Promise<{ disks: IDisk[] | null; error: string | null }>;

  // eslint-disable-next-line no-unused-vars
  getDisk(params: {
    id: number;
  }): Promise<{ disk: IDisk | null; error: string | null }>;

  removeAll(): Promise<{ disks: IDisk[] | null; error: string | null }>;

  // eslint-disable-next-line no-unused-vars
  orderDisk(params: {
    id: number;
  }): Promise<{ error: string | null; disk: IDisk | null }>;

  // eslint-disable-next-line no-unused-vars
  getDiskByName(params: {
    name: string;
  }): Promise<{ disk: IDisk | null; error: string | null }>;
}
