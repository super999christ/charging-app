import { ToastContext } from "@root/routes/ToastProvider";
import { useContext } from "react";

export default function useToast() {
  const toastContext = useContext(ToastContext);

  const toast = {
    success: (message: string) =>
      toastContext.toast({ message, variant: "success" }),
    error: (message: string) =>
      toastContext.toast({ message, variant: "error" }),
  };

  return toast;
}
