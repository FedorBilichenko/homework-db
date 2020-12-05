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
    error: string | null;
  }>;

  getAuthors(): Promise<{
    authors: IAuthor[] | null;
    error: string | null;
  }>;

  // eslint-disable-next-line no-unused-vars
  getAuthor(params: {
    id: number;
  }): Promise<{ author: IAuthor | null; error: string | null }>;

  removeAll(): Promise<{
    authors: IAuthor[] | null;
    error: string | null;
  }>;
}
