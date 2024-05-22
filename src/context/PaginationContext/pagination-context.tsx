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
    function paginateList() {
      const startIndex = (page - 1) * Number(listSize);
      const endIndex = startIndex + Number(listSize);

      const paginatedList = currentList.slice(startIndex, endIndex);

      setPaginatedList(paginatedList);
    }

    paginateList();
  }, [page, listSize, currentList]);

  useEffect(() => {
    const storedOrderBy = localStorage.getItem("TODOLIST@ORDERBY");
    const storedListSize = localStorage.getItem("TODOLIST@LISTSIZE");

    if (storedOrderBy && storedOrderBy !== "")
      setOrderBy(storedOrderBy as IOrderBy);
    if (storedListSize && storedListSize !== "")
      setListSize(storedListSize as IListSize);
  }, []);

  const currentListOrderedByOldest = paginatedList;
  const currentListOrderedByLatest = paginatedList.toReversed();
  const currentListOrderedFromAToZ = paginatedList.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  const currentListOrderedFromZToA = paginatedList.toSorted((a, b) =>
    b.name.localeCompare(a.name)
  );
  const currentListOrderedByLongerTask = paginatedList.toSorted(
    (a, b) => a.name.length - b.name.length
  );
  const currentListOrderedByShortestTask = paginatedList.toSorted(
    (a, b) => b.name.length - a.name.length
  );

  return (
    <PaginationContext.Provider
      value={{
        currentList,
        setCurrentList,
        setOrderBy,
        orderBy,
        listSize,
        setListSize,
        currentListOrderedByOldest,
        currentListOrderedByLatest,
        currentListOrderedFromAToZ,
        currentListOrderedFromZToA,
        currentListOrderedByLongerTask,
        currentListOrderedByShortestTask,
        page,
        setPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export default PaginationProvider;