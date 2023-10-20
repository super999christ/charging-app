import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

export const ToastContext = createContext({
  toast: (_val: ToastMessage) => {},
});

export type ToastVariant = "success" | "error" | "info";

type ToastMessage = {
  message: string;
  variant?: ToastVariant;
};

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [theToast, setTheToast] = useState<ToastMessage>();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const { pathname } = useLocation();

  useEffect(() => {
    // Dismiss the toast on page change as long as it's been more than a second since the last toast message.
    const t = new Date(date.getTime() + 1000 * 1);

    if (t < new Date()) onDismiss();
  }, [pathname]);

  const toast = useCallback(
    (content: ToastMessage) => {
      setTheToast({ ...content });
      setVisible(true);
      setDate(new Date());
    },
    [setTheToast, setVisible]
  );

  const onDismiss = () => setVisible(false);

  return (
    <ToastContext.Provider value={{ toast }}>
      <div
        id="toast"
        className={`flex justify-center items-center py-3 px-4 w-full items-center ${
          !visible && "hidden"
        }`}
      >
        <p className={`text-sm font-normal ${color(theToast?.variant)}`}>
          {theToast?.message}
        </p>
      </div>

      {children}
    </ToastContext.Provider>
  );
}

function color(variant: ToastVariant | undefined) {
  if (variant === "success") return "text-nxu-charging-green";
  if (variant === "error") return "text-nxu-charging-red";
  return "text-primary-700";
}
