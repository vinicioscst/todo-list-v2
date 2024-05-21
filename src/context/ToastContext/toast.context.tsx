"use client";
import { createContext, useState } from "react";
import { IToast, IToastContext, IToastProvider } from "./types";

export const ToastContext = createContext({} as IToastContext);

function ToastProvider({ children }: IToastProvider) {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<IToast | null>(null);

  function handleToast({ message, severity, variant }: IToast) {
    setToastInfo({ message, severity, variant });
    setIsToastOpen(true);
  }

  function handleToastClose() {
    setIsToastOpen(false);
  }

  return (
    <ToastContext.Provider
      value={{ isToastOpen, toastInfo, handleToast, handleToastClose }}
    >
      {children}{" "}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
