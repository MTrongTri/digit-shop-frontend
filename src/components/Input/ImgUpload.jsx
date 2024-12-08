/* eslint-disable react/prop-types */
import { upload } from "@/services/mediaService";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const ImgUpload = ({
  name,
  id,
  url = "",
  control,
  rules,
  className,
  setIsUploading,
  delePreviewImg,
  ...props
}) => {
  const [previewImg, setPreviewImg] = useState(url);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [hasErroUpload, setHasErrorUpload] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (delePreviewImg && previewImg) {
      setPreviewImg("");
      URL.revokeObjectURL(previewImg);
    }

    return () => {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    };
  }, [previewImg, delePreviewImg]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="relative h-full w-full">
            <label
              htmlFor={id}
              className={clsx(
                "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100",
                { "cursor-not-allowed": disabledButton },
                className,
              )}
            >
              {previewImg ? (
                <div className="relative flex items-center justify-center">
                  <img
                    src={previewImg}
                    alt=""
                    className={clsx({
                      "opacity-20":
                        (uploadPercentage <= 100 && uploadPercentage != 0) ||
                        hasErroUpload,
                    })}
                  />
                  {(uploadPercentage > 0 || hasErroUpload) && (
                    <progress
                      className="progress progress-info absolute left-1/2 top-1/2 w-[100px] -translate-x-1/2 -translate-y-1/2"
                      value={uploadPercentage}
                      max="100"
                    ></progress>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <IoCloudUploadOutline className="text-3xl" />
                  <p className="mb-2 text-center text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG</p>
                </div>
              )}
              <input
                id={id}
                type="file"
                {...props}
                onChange={async (e) => {
                  const files = e.target.files;
                  setPreviewImg(URL.createObjectURL(files[0]));

                  if (files[0]) {
                    const formData = new FormData();
                    formData.append("mediaFile", files[0]);

                    if (previewImg) {
                      URL.revokeObjectURL(previewImg);
                    }

                    setIsUploading(true);
                    setDisabledButton(true);
                    const { statusCode, data } = await upload(
                      formData,
                      (percentage) => {
                        setUploadPercentage(percentage);
                      },
                    );
                    setIsUploading(false);
                    setDisabledButton(false);
                    setUploadPercentage(0);

                    if (statusCode === 201) {
                      field.onChange(data.id);
                    } else {
                      setHasErrorUpload(true);
                      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
                    }
                  }
                }}
                className="hidden"
              />
            </label>

            {!disabledButton && previewImg && (
              <button
                className="tooltip absolute -right-[10px] -top-[10px] flex size-6 rounded-full border border-gray-400 bg-white hover:opacity-80"
                data-tip="Xóa"
                onClick={(e) => {
                  e.stopPropagation();
                  if (previewImg) {
                    URL.revokeObjectURL(previewImg);
                    setPreviewImg("");
                  }
                  field.onChange(null);
                }}
              >
                <IoMdClose className="m-auto text-red-500" />
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ImgUpload;
