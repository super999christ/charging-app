import { ToastContext, ToastVariant } from "@root/routes/ToastProvider";
import { useContext } from "react";

export default function useToast() {
  const toastContext = useContext(ToastContext);

  function toast(message: string, variant?: ToastVariant) {
    toastContext.toast({ message, variant: variant ?? "error" });
  }

  return toast;
}
