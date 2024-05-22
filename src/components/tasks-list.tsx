import { Box, Divider } from "@mui/material";
import ListOrderByFilter from "./list-orderby-filter";
import ListSizeFilter from "./list-size-filter";
import TaskCard from "./tasks-card";
import { ITask } from "@/context/TasksContext/types";
import ListPagination from "./list-pagination";

interface ITasksList {
  list: ITask[];
  listType: "to-do" | "done" | "deleted";
}

function TasksList({ list, listType }: ITasksList) {
  return (
    <>
      <Box width="100%" display="flex" alignItems="center" gap="1rem">
        <ListOrderByFilter />
        <ListSizeFilter />
      </Box>
      <Divider />
      <Box
        component="ul"
        padding="0"
        margin="0"
        display="flex"
        flexDirection="column"
        gap="0.5rem"
      >
        {list.map((task) => (
          <TaskCard key={task.id} task={task} listType={listType} />
        ))}
      </Box>

      <ListPagination />
    </>
  );
}

export default TasksList;
