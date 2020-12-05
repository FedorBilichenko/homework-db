import { IModels } from '../models';

export default class BaseService {
  models: IModels;

  constructor({ models }: { models: IModels }) {
    this.models = models;
  }
}
