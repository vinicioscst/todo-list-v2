"use client";
import { PaginationContext } from "@/context/PaginationContext/pagination-context";
import { IListSize } from "@/context/PaginationContext/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext } from "react";

function ListSizeFilter() {
  const { listSize, setListSize } = useContext(PaginationContext);

  const handleChange = (event: SelectChangeEvent) => {
    localStorage.setItem("TODOLIST@LISTSIZE", event.target.value);
    setListSize(event.target.value as IListSize);
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      sx={{ minWidth: "100px", flexGrow: "1" }}
    >
      <InputLabel color="secondary" id="list-size-filter">
        Tasks per page
      </InputLabel>
      <Select
        color="secondary"
        labelId="list-size-filter"
        id="demo-simple-select"
        defaultValue={listSize}
        value={listSize}
        label="Tasks per page"
        onChange={handleChange}
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ListSizeFilter;
