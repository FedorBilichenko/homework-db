export interface IAuthor {
  id: number;
  name: string;
}

export interface IAuthorModel {
  // eslint-disable-next-line no-unused-vars
  createAuthor(params: {
    name: string;
  }): Promise<{
    author: IAuthor | null;
  }>;
  getAuthors(): Promise<{
    authors: IAuthor[];
  }>;
}
