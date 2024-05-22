"use client";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { TasksContext } from "@/context/TasksContext/tasks-context";
import theme from "@/styles/theme";

function CreateTaskForm() {
  const { register, handleSubmit, handleCreateTask, errors } =
    useContext(TasksContext);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleCreateTask)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        paddingTop: "2rem",
      }}
    >
      <TextField
        label={errors.name ? errors.name?.message : "Write a task"}
        variant="outlined"
        {...register("name")}
        error={!!errors.name}
        sx={{ width: "100%" }}
        color="secondary"
      />
      <IconButton aria-label="add" type="submit" color="secondary" size="large">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CreateTaskForm;
