import { ITask } from "../TasksContext/types";

export interface IPaginationProvider {
  children: React.ReactNode;
}

export interface IPaginationContext {
  currentList: [] | ITask[];
  setCurrentList: React.Dispatch<React.SetStateAction<[] | ITask[]>>;
  paginateList(pageNumber: number): void;
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
