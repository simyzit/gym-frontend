export interface IPackage {
  _id: string;
  name: string;
  description: Array<string>;
  days: number;
  price: number;
}

export interface IPackageStore {
  allItems: IPackage[];
  isLoading: boolean;
}
