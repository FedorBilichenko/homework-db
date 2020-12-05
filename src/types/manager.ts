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
    error: string | null;
  }>;

  getManagers(): Promise<{
    managers: IManager[] | null;
    error: string | null;
  }>;

  getManagersWithOrders(): Promise<{
    managers: IManager[] | null;
    error: string | null;
  }>;

  // eslint-disable-next-line no-unused-vars
  getManager(params: {
    id: number;
  }): Promise<{
    manager: IManager | null;
    error: string | null;
  }>;

  removeAll(): Promise<{
    managers: IManager[] | null;
    error: string | null;
  }>;
}
