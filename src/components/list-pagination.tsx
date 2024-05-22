"use client";
import { PaginationContext } from "@/context/PaginationContext/pagination-context";
import { Pagination } from "@mui/material";
import { useContext, useEffect } from "react";

function ListPagination() {
  const { currentList, listSize, setPage, page } =
    useContext(PaginationContext);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) {
    setPage(value);
  }

  return (
    <Pagination
      count={Math.ceil(currentList.length / Number(listSize))}
      color="secondary"
      page={page}
      defaultPage={page}
      onChange={handleChange}
      sx={{ margin: "0 auto", paddingX: "1rem" }}
    />
  );
}

export default ListPagination;
