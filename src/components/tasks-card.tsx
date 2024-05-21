"use state";
import { TasksContext } from "@/context/TasksContext/tasks-context";
import { ITask, TCreateTask } from "@/context/TasksContext/types";
import { Close, Delete, Done, Edit } from "@mui/icons-material";
import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import { useContext, useState } from "react";
import Modal from "./modal";

interface ITaskCard {
  task: ITask;
  listType: "to-do" | "done" | "deleted";
}

function TaskCard({ task, listType }: ITaskCard) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { errors, register, handleSubmit, handleTaskDone, handleEditTask } =
    useContext(TasksContext);

  function submitEdit(data: TCreateTask) {
    handleEditTask(data, task.id);
    setDeleteMode(false);
  }

  return (
    <Card>
      <Box>
        {deleteMode ? (
          <Box
            component="form"
            id="edit-form"
            onSubmit={handleSubmit(submitEdit)}
          >
            <TextField
              label={errors.name ? errors.name?.message : "Edit task"}
              variant="filled"
              {...register("name")}
              error={!!errors.name}
            />
          </Box>
        ) : (
          <Typography>{task.name}</Typography>
        )}
        <Typography>
          {formatDistance(task.createdAt, new Date(), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </Typography>
      </Box>
      {listType === "to-do" && !deleteMode ? (
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
      ) : (
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
        setIsModalOpen={setIsModalOpen}
        taskId={task.id}
      />
    </Card>
  );
}

export default TaskCard;
