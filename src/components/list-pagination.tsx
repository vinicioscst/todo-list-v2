"use client";
import { PaginationContext } from "@/context/PaginationContext/pagination-context";
import { Pagination } from "@mui/material";
import { useContext, useEffect } from "react";

function ListPagination() {
  const { currentList, listSize, paginateList } = useContext(PaginationContext);

  useEffect(() => {
    paginateList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) {
    paginateList(value);
  }

  return (
    <Pagination
      count={Math.ceil(currentList.length / Number(listSize))}
      color="secondary"
      defaultPage={1}
      onChange={handleChange}
    />
  );
}

export default ListPagination;
