import { IAuthor, IAuthorModel } from '../types';

import BaseService from './BaseService';

export default class AuthorService extends BaseService<IAuthorModel> {
  constructor({ model }: { model: IAuthorModel }) {
    super({ model });
  }

  async createAuthor({ name }: { name: string }) {
    const { author } = await this.model.createAuthor({ name });

    return {
      author,
    };
  }

  async getAuthors(): Promise<{ authors: IAuthor[] }> {
    return this.model.getAuthors();
  }
}
