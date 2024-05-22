"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IModal {
  isModalOpen: boolean;
  title: string;
  content: string;
  handleDelete: () => void;
  handleClose: () => void;
}

function Modal({
  isModalOpen,
  title,
  content,
  handleDelete,
  handleClose,
}: IModal) {
  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleDelete} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
