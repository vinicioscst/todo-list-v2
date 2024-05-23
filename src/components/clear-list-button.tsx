"use client";
import { PaginationContext } from "@/context/PaginationContext/pagination-context";
import { DeleteSweep } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import Modal from "./modal";
import { ToastContext } from "@/context/ToastContext/toast.context";
import theme from "@/styles/theme";

interface IClearListButton {
  listType: "to-do" | "done" | "deleted";
}

function ClearListButton({ listType }: IClearListButton) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCurrentList, paginatedList, currentList } =
    useContext(PaginationContext);
  const { handleToast } = useContext(ToastContext);

  function handleOpen() {
    if (paginatedList.length === 0) {
      setIsModalOpen(false);
      handleToast({
        message: "List is already empty",
        severity: "error",
        variant: "filled",
      });
    } else {
      setIsModalOpen(true);
    }
  }

  function handleClear() {
    if (listType === "to-do") localStorage.removeItem("TODOLIST@TASKSTODO");

    if (listType === "done") localStorage.removeItem("TODOLIST@TASKSDONE");

    if (listType === "deleted")
      localStorage.removeItem("TODOLIST@TASKSDELETED");

    setCurrentList([]);

    setIsModalOpen(false);
    handleToast({
      message: "List cleared with success",
      severity: "success",
      variant: "filled",
    });
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteSweep />}
        onClick={handleOpen}
        sx={{ color: theme.palette.text.primary }}
      >
        Clear
      </Button>
      <Modal
        isModalOpen={isModalOpen}
        title="Do you want to clear this list?"
        content="This action can't be undone"
        handleClose={() => {
          setIsModalOpen(false);
        }}
        handleDelete={handleClear}
      />
    </>
  );
}

export default ClearListButton;
