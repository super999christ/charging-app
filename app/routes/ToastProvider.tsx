import { ReactNode, createContext, useCallback, useState } from "react";

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

  const toast = useCallback(
    (content: ToastMessage) => {
      setTheToast({ ...content });
      setVisible(true);

      if (content.variant !== "error")
        setTimeout(() => setVisible(false), 10000);
    },
    [setTheToast, setVisible]
  );

  const onDismiss = () => setVisible(false);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div
        id="toast"
        className={`fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 bg-white rounded-lg shadow ${
          !visible && "hidden"
        } ${color(theToast?.variant)}`}
        role="alert"
      >
        <div>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {icon(theToast?.variant)}
          </svg>
          <span className="sr-only">Icon</span>
        </div>

        <div className="ml-3 text-sm font-normal">{theToast?.message}</div>

        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={onDismiss}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </ToastContext.Provider>
  );
}

function icon(variant: ToastVariant | undefined) {
  if (variant === "success")
    return (
      <path
        stroke="currentColor"
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    );
  if (variant === "error")
    return (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    );

  return (
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
  );
}

function color(variant: ToastVariant | undefined) {
  if (variant === "success") return "text-green-700";
  if (variant === "error") return "text-red-700";
  return "text-primary-700";
}
