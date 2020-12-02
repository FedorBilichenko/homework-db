export default class BaseService<Model> {
  model: Model;

  constructor({ model }: { model: Model }) {
    this.model = model;
  }
}
