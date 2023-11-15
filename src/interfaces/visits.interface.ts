export interface IVisit {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

export interface IVisitStore {
  allItems: IVisit[];
  isLoading: boolean;
}
