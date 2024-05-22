"use client";
import { createContext, useEffect, useState } from "react";
import {
  IListSize,
  IOrderBy,
  IPaginationContext,
  IPaginationProvider,
} from "./types";
import { ITask } from "../TasksContext/types";

export const PaginationContext = createContext({} as IPaginationContext);

function PaginationProvider({ children }: IPaginationProvider) {
  const [currentList, setCurrentList] = useState<ITask[]>([]);
  const [orderBy, setOrderBy] = useState<IOrderBy>("Latest");
  const [listSize, setListSize] = useState<IListSize>("10");
  const [paginatedList, setPaginatedList] = useState<ITask[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    function getOrderedList(orderBy: IOrderBy, list: ITask[]) {
      switch (orderBy) {
        case "Oldest":
          return list;
        case "Latest":
          return list.slice().reverse();
        case "A-Z":
          return list.slice().sort((a, b) => a.name.localeCompare(b.name));
        case "Z-A":
          return list.slice().sort((a, b) => b.name.localeCompare(a.name));
        case "Longer":
          return list.slice().sort((a, b) => b.name.length - a.name.length);
        case "Shorter":
          return list.slice().sort((a, b) => a.name.length - b.name.length);
        default:
          return list;
      }
    }

    function paginateList() {
      const orderedList = getOrderedList(orderBy, currentList);
      const startIndex = (page - 1) * Number(listSize);
      const endIndex = startIndex + Number(listSize);

      const paginatedList = orderedList.slice(startIndex, endIndex);

      setPaginatedList(paginatedList);
    }

    paginateList();
  }, [page, listSize, currentList, orderBy]);

  useEffect(() => {
    const storedOrderBy = localStorage.getItem("TODOLIST@ORDERBY");
    const storedListSize = localStorage.getItem("TODOLIST@LISTSIZE");

    if (storedOrderBy && storedOrderBy !== "")
      setOrderBy(storedOrderBy as IOrderBy);
    if (storedListSize && storedListSize !== "")
      setListSize(storedListSize as IListSize);
  }, []);

  return (
    <PaginationContext.Provider
      value={{
        currentList,
        paginatedList,
        setCurrentList,
        setOrderBy,
        orderBy,
        listSize,
        setListSize,
        page,
        setPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export default PaginationProvider;
