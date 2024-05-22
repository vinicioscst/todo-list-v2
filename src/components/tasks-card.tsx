"use client";
import { TasksContext } from "@/context/TasksContext/tasks-context";
import { ITask, TCreateTask } from "@/context/TasksContext/types";
import { Close, Delete, Done, Edit } from "@mui/icons-material";
import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import { useContext, useState } from "react";
import Modal from "./modal";
import theme from "@/styles/theme";

interface ITaskCard {
  task: ITask;
  listType: "to-do" | "done" | "deleted";
}

function TaskCard({ task, listType }: ITaskCard) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    errorsEdit,
    registerEdit,
    handleSubmitEdit,
    handleTaskDone,
    handleEditTask,
    handleDeleteTask,
  } = useContext(TasksContext);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleModalDelete() {
    handleDeleteTask(task.id);
  }

  function submitEdit(data: TCreateTask) {
    handleEditTask(data, task.id);
    setDeleteMode(false);
  }

  return (
    <Card
      sx={{
        boxShadow: "0 0",
        bgcolor: theme.palette.grey[900],
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
      }}
    >
      <Box>
        {deleteMode ? (
          <Box
            component="form"
            id="edit-form"
            onSubmit={handleSubmitEdit(submitEdit)}
            sx={{ width: "100%" }}
          >
            <TextField
              label={errorsEdit.name ? errorsEdit.name?.message : "Edit task"}
              variant="outlined"
              {...registerEdit("name")}
              error={!!errorsEdit.name}
              size="small"
              color="secondary"
            />
          </Box>
        ) : (
          <Typography variant="h6" color={theme.palette.secondary.light}>
            {task.name}
          </Typography>
        )}
        {listType === "to-do" && !deleteMode && (
          <Typography variant="subtitle1">
            {formatDistance(task.createdAt, new Date(), {
              includeSeconds: true,
              addSuffix: true,
            })}
          </Typography>
        )}
      </Box>
      {listType === "to-do" && !deleteMode && (
        <Box>
          <IconButton
            aria-label="mark task as done"
            type="button"
            color="secondary"
            onClick={() => handleTaskDone(task)}
          >
            <Done />
          </IconButton>
          <IconButton
            aria-label="edit task"
            type="button"
            color="secondary"
            onClick={() => setDeleteMode(true)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete task"
            type="button"
            color="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            <Delete />
          </IconButton>
        </Box>
      )}
      {listType === "to-do" && deleteMode && (
        <Box>
          <IconButton
            aria-label="edit complete"
            type="submit"
            color="secondary"
            form="edit-form"
          >
            <Done />
          </IconButton>
          <IconButton
            aria-label="cancel edit"
            type="button"
            color="secondary"
            onClick={() => setDeleteMode(false)}
          >
            <Close />
          </IconButton>
        </Box>
      )}
      <Modal
        isModalOpen={isModalOpen}
        title="Do you want to delete this task?"
        content="This action can't be undone"
        handleClose={handleModalClose}
        handleDelete={handleModalDelete}
      />
    </Card>
  );
}

export default TaskCard;
