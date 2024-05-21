export interface IToastContext {
  isToastOpen: boolean;
  toastInfo: IToast | null;
  handleToast: ({ message, severity, variant }: IToast) => void;
  handleToastClose: () => void;
}

export interface IToastProvider {
  children: React.ReactNode;
}

export interface IToast {
  message: string;
  severity: "error" | "info" | "success" | "warning";
  variant: "filled" | "outlined" | "standard";
}
