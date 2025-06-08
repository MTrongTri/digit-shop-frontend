import clsx from "clsx";
import React from "react";

function TableManageContainer({ className, children }) {
  return (
    <div
      className={clsx(
        "mt-8 max-h-[400px] overflow-y-auto rounded-md bg-white p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default TableManageContainer;
