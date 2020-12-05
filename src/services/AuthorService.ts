import BaseService from './BaseService';

export default class AuthorService extends BaseService {
  async createAuthor({ name }: { name: string }) {
    return this.models.authorModel.createAuthor({ name });
  }

  async getAuthors() {
    return this.models.authorModel.getAuthors();
  }

  async removeAll() {
    return this.models.authorModel.removeAll();
  }
}
