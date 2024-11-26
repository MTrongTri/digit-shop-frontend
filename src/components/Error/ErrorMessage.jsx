import clsx from "clsx";
import { IoIosWarning } from "react-icons/io";

// eslint-disable-next-line react/prop-types
function ErrorMessage({ message, className }) {
  return (
    <div
      className={clsx(
        "mt-2 flex items-center gap-1 text-xs text-red-500",
        className,
      )}
    >
      <IoIosWarning />
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
