"use client";
import { TasksContext } from "@/context/TasksContext/tasks-context";
import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import TasksList from "./tasks-list";
import { PaginationContext } from "@/context/PaginationContext/pagination-context";

interface ITaskListSection {
  listType: "to-do" | "done" | "deleted";
}

function TasksListSection({ listType }: ITaskListSection) {
  const { setCurrentList, orderBy, paginatedList } =
    useContext(PaginationContext);
  const { tasksToDo, tasksDone, tasksDeleted } = useContext(TasksContext);

  useEffect(() => {
    function handleList() {
      if (listType === "to-do") {
        setCurrentList(tasksToDo);
      } else if (listType === "done") {
        setCurrentList(tasksDone);
      } else {
        setCurrentList(tasksDeleted);
      }
    }
    handleList();
  }, [listType, setCurrentList, tasksDeleted, tasksDone, tasksToDo]);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        paddingTop: "1.5rem",
      }}
    >
      <TasksList listType={listType} list={paginatedList} />
    </Box>
  );
}

export default TasksListSection;
