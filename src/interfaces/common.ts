export interface ICommonPaginationRes<T> {
  total: number;
  data: Array<T>;
}

export interface ICommonResponse<T> {
  status: number;
  message?: string;
  error?: string;
  payload?: Partial<T> | Array<Partial<T>> | ICommonPaginationRes<T>;
}
