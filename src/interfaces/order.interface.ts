export interface IOrder {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  packageName: string;
}

export interface IOrderStore {
  allItems: IOrder[];
  isLoading: boolean;
}
