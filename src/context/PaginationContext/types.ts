import { ITask } from "../TasksContext/types";

export interface IPaginationProvider {
  children: React.ReactNode;
}

export interface IPaginationContext {
  currentList: [] | ITask[];
  setCurrentList: React.Dispatch<React.SetStateAction<[] | ITask[]>>;
  setOrderBy: React.Dispatch<React.SetStateAction<IOrderBy>>;
  orderBy: IOrderBy;
  setListSize: React.Dispatch<React.SetStateAction<IListSize>>;
  listSize: IListSize;
  currentListOrderedByOldest: ITask[];
  currentListOrderedByLatest: ITask[];
  currentListOrderedFromAToZ: ITask[];
  currentListOrderedFromZToA: ITask[];
  currentListOrderedByLongerTask: ITask[];
  currentListOrderedByShortestTask: ITask[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export type IOrderBy =
  | "Latest"
  | "Oldest"
  | "A-Z"
  | "Z-A"
  | "Longer"
  | "Shorter";

export type IListSize = "5" | "10" | "15";

export type IListType = "to-do" | "done" | "deleted";
