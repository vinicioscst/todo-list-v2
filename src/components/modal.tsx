"use client";
import { TasksContext } from "@/context/TasksContext/tasks-context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";

interface IModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
}

function Modal({ isModalOpen, setIsModalOpen, taskId }: IModal) {
  const { handleDeleteTask } = useContext(TasksContext);

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleDelete() {
    handleDeleteTask(taskId);
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        Do you want to delete this task?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {"This action can't be undone"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Disagree
        </Button>
        <Button color="secondary" onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
