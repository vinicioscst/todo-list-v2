"use client";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { TasksContext } from "@/context/tasks-context";

function CreateTaskForm() {
  const { register, handleSubmit, handleCreateTask } = useContext(TasksContext);

  return (
    <Box component="form" onSubmit={handleSubmit(handleCreateTask)}>
      <TextField
        label="Write a task"
        variant="standard"
        {...register("name")}
      />
      <IconButton aria-label="add" type="submit">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CreateTaskForm;
