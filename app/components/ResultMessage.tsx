const getAlertClass = (alertType: AlertType) => {
  let className = "text-[14px] ";
  const colors = {
    error: "red",
    info: "white",
    success: "green",
  };
  className += `text-nxu-charging-${colors[alertType]}`;
  return className;
};

export type AlertType = "error" | "success" | "info";

type Props = {
  message: string;
  alertType: AlertType;
};

export default function ResultMessage({ message, alertType }: Props) {
  return (
    <p className={`${!message && "hidden"} ${getAlertClass(alertType)}`}>
      {message}
    </p>
  );
}
