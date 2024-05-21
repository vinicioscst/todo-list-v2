"use client";
import { TasksContext } from "@/context/TasksContext/tasks-context";
import { Box } from "@mui/material";
import { useContext } from "react";
import TaskCard from "./tasks-card";

interface ITaskListSection {
  listType: "to-do" | "done" | "deleted";
}

function TasksListSection({ listType }: ITaskListSection) {
  const { tasksToDo, tasksDone, tasksDeleted } = useContext(TasksContext);

  return (
    <Box component="section">
      <Box
        component="ul"
        padding="0"
        display="flex"
        flexDirection="column"
        gap="0.5rem"
      >
        {listType === "to-do" &&
          tasksToDo.map((task) => <TaskCard key={task.id} task={task} />)}
        {listType === "done" &&
          tasksDone.map((task) => <TaskCard key={task.id} task={task} />)}
        {listType === "deleted" &&
          tasksDeleted.map((task) => <TaskCard key={task.id} task={task} />)}
      </Box>
    </Box>
  );
}

export default TasksListSection;
