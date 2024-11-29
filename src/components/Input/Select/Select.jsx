import clsx from "clsx";
import React from "react";
import { Controller } from "react-hook-form";

function Select({ id, name, control, rules, children, className, ...props }) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <select
            id={id}
            className={clsx(
              "select select-info w-full max-w-xs border-gray-400",
              className,
            )}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            {...props}
          >
            {children}
          </select>
        )}
      />
    </div>
  );
}

export default Select;
