"use client";
import { ToastContext } from "@/context/ToastContext/toast.context";
import theme from "@/styles/theme";
import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";

function Toast() {
  const { isToastOpen, handleToastClose, toastInfo } = useContext(ToastContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isToastOpen}
      autoHideDuration={4000}
      onClose={handleToastClose}
    >
      <Alert
        onClose={handleToastClose}
        severity={toastInfo?.severity}
        variant={toastInfo?.variant}
        sx={{ color: theme.palette.text.primary }}
      >
        {toastInfo?.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
