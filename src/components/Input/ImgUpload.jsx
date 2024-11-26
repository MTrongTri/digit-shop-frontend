/* eslint-disable react/prop-types */
import { upload } from "@/services/uploadService";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";

const ImgUpload = ({ name, id, control, rules, className, ...props }) => {
  const [previewImg, setPreviewImg] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [hasErroUpload, setHasErrorUpload] = useState(false);

  useEffect(() => {
    return () => {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    };
  }, [previewImg]);

  return (
    <div className="flex h-full w-full items-center justify-center">
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
            {previewImg ? (
              <div className="relative flex items-center justify-center">
                <img
                  src={previewImg}
                  alt=""
                  className={clsx({
                    "opacity-20":
                      (uploadPercentage < 100 && uploadPercentage != 0) ||
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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
                  formData.append("file", files[0]);
                  const { statusCode, data } = await upload(
                    formData,
                    (percentage) => {
                      console.log(percentage);
                      setUploadPercentage(percentage);
                      if (percentage === 100) {
                        setUploadPercentage(0);
                      }
                    },
                  );

                  if (statusCode === 201) {
                    const { publicId, url } = data;
                    field.onChange({ publicId, url });
                  }
                  else {
                    setHasErrorUpload(true)
                    toast.error("Đã có lỗi xảy ra, vui lòng thử lại")
                  }

                }
              }}
              className="hidden"
            />
          </label>
        )}
      />
    </div>
  );
};

export default ImgUpload;
