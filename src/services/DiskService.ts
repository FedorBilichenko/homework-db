import BaseService from './BaseService';

export default class DiskService extends BaseService {
  async createDisk(params: {
    name: string;
    count: number;
    price: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    author_id: number;
  }) {
    return this.models.diskModel.createDisk({
      ...params,
      authorId: params.author_id,
    });
  }

  async getDisks() {
    return this.models.diskModel.getDisks();
  }

  async getDisk(params: { id: number }) {
    return this.models.diskModel.getDisk(params);
  }

  async getDiskByName(params: { name: string }) {
    return this.models.diskModel.getDiskByName(params);
  }

  async getDisksByParams(params: {
    name: string;
    authorId: string;
    price: string;
  }) {
    return this.models.diskModel.getDisksByParams(params);
  }

  async removeAll() {
    return this.models.diskModel.removeAll();
  }
}
