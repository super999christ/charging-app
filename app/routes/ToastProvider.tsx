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
    },
    [setTheToast, setVisible]
  );

  const onDismiss = () => setVisible(false);

  return (
    <ToastContext.Provider value={{ toast }}>
      <div
        id="toast"
        tabIndex={-1}
        className={`flex fixed z-50 gap-8 justify-between items-center py-3 px-4 w-full sm:items-center lg:py-4 bg-[#3a3a3a] ${
          !visible && "hidden"
        }`}
      >
        <div>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            {icon(theToast?.variant)}
          </svg>
          <span className="sr-only">Icon</span>
        </div>

        <p className={`text-sm font-normal ${color(theToast?.variant)}`}>
          {theToast?.message}
        </p>

        <button
          data-collapse-toggle="toast"
          type="button"
          onClick={onDismiss}
          className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {children}
    </ToastContext.Provider>
  );
}

function icon(variant: ToastVariant | undefined) {
  if (variant === "success")
    return (
      <path
        fill="#67a964"
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    );
  if (variant === "error")
    return (
      <path
        fill="#d44839"
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
      />
    );

  return (
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
  );
}

function color(variant: ToastVariant | undefined) {
  if (variant === "success") return "text-success";
  if (variant === "error") return "text-error";
  return "text-primary-700";
}
