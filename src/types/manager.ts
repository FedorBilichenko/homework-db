export interface IManager {
  id: number;
  name: string;
}

export interface IManagerModel {
  // eslint-disable-next-line no-unused-vars
  createManager(params: {
    name: string;
  }): Promise<{
    manager: IManager | null;
  }>;
  getManagers(): Promise<{
    managers: IManager[];
  }>;
}
