import clsx from "clsx";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function FloatingLabelInput({ label, id, type, ...prop }) {
  const [value, setValue] = useState("");
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={clsx(
          "absolute left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-500 duration-300 group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-primary",
          {
            "top-1/2": value === "",
            "left-2": value !== "",
          },
        )}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...prop}
        className="w-full rounded-md border border-gray-400 px-4 py-3 text-gray-500 outline-none focus:border-primary"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default FloatingLabelInput;
