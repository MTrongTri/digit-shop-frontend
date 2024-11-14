/* eslint-disable react/prop-types */
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";

const ChooseFileInput = ({ name, id, control, rules, className, ...props }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <label
            htmlFor={id}
            className={clsx(
              "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100",
              className,
            )}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <IoCloudUploadOutline className="text-3xl" />
              <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG</p>
            </div>
            <input
              id={id}
              type="file"
              {...props}
              onChange={(e) => field.onChange(e.target.files)}
              className="hidden"
            />
          </label>
        )}
      />
    </div>
  );
};

export default ChooseFileInput;
