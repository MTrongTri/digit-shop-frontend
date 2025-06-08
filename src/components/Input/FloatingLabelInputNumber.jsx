/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const FloatingLabelInputNumber = ({
  label,
  id,
  name,
  type = "text",
  control,
  rules,
  defaultValue = "",
  className,
  ...props
}) => {
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="group relative">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => {
          useEffect(() => {
            setHasValue(!!field.value);
          }, [field.value]);

          return (
            <>
              <label
                htmlFor={id}
                className={clsx(
                  "absolute -translate-y-1/2 bg-white px-2 text-sm text-gray-500 duration-300 group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-primary",
                  {
                    "left-4 top-1/2 text-sm": !hasValue,
                    "left-2 text-xs": hasValue,
                  },
                )}
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                {...field}
                {...props}
                onChange={(e) => {
                  const value = e.target.value;
                  if (Number(value) || value === "0" || value === "") {
                    setHasValue(!!value);
                    field.onChange(value);
                  }
                }}
                className={clsx(
                  "w-full rounded-md border border-gray-400 px-4 py-3 text-gray-500 outline-none focus:border-primary",
                  className,
                )}
              />
            </>
          );
        }}
      ></Controller>
    </div>
  );
};

export default FloatingLabelInputNumber;
