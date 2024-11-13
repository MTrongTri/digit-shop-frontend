import { IoCloudUploadOutline } from "react-icons/io5";

function ChooseFileInput() {
  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <IoCloudUploadOutline className="size-6" />
          <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
}

export default ChooseFileInput;
