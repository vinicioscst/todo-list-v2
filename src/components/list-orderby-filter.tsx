"use client";
import { PaginationContext } from "@/context/PaginationContext/pagination-context";
import { IOrderBy } from "@/context/PaginationContext/types";
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext } from "react";

function ListOrderByFilter() {
  const { setOrderBy, orderBy } = useContext(PaginationContext);

  const handleChange = (event: SelectChangeEvent) => {
    localStorage.setItem("TODOLIST@ORDERBY", event.target.value);
    setOrderBy(event.target.value as IOrderBy);
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      sx={{ minWidth: "100px", flexGrow: "1" }}
    >
      <InputLabel color="secondary" htmlFor="order-by-filter">
        Order by
      </InputLabel>
      <Select
        color="secondary"
        defaultValue={orderBy}
        value={orderBy}
        id="order-by-filter"
        label="Order by"
        onChange={handleChange}
      >
        <ListSubheader>Creation Date</ListSubheader>
        <MenuItem value="Latest">Latest</MenuItem>
        <MenuItem value="Oldest">Oldest</MenuItem>

        <ListSubheader>Alphabetical</ListSubheader>
        <MenuItem value="A-Z">A-Z</MenuItem>
        <MenuItem value="Z-A">Z-A</MenuItem>

        <ListSubheader>Task Length</ListSubheader>
        <MenuItem value="Longer">Longer</MenuItem>
        <MenuItem value="Shorter">Shorter</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ListOrderByFilter;
