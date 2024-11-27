import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Error/ErrorMessage";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import ImgUpload from "@/components/Input/ImgUpload";
import { createCategory } from "@/services/categoryService";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateProductPage() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    const { statusCode } = await createCategory(formData);

    if (statusCode === 201) {
      toast.success("Đã thêm danh mục thành công");
      navigate("/admin/categories");
    } else {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Sản phẩm</h2>
      </div>

      <div className="mt-6 h-[540px] overflow-y-auto bg-white p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div>
            <FloatingLabelInput
              label="Tên sản phẩm"
              name="name"
              type="text"
              id="cate-name"
              control={control}
              rules={{ required: "Tên không được bỏ trống" }}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>

          <div>
            <FloatingLabelInput
              label="Mô tả"
              name="description"
              type="text"
              id="cate-description"
              control={control}
              rules={{ required: "Mô tả không được bỏ trống" }}
              className={clsx(errors.description && "border-red-500")}
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>

          <div className="flex gap-6">
            <div>
              <span>Ảnh chính</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ImgUpload
                  id="img"
                  name="img"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  className={clsx(errors.img && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.img && <ErrorMessage message={errors.img.message} />}
              </div>
            </div>

            <div>
              <span>Icon</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ImgUpload
                  id="icon"
                  name="icon"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  className={clsx(errors.icon && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.icon && <ErrorMessage message={errors.icon.message} />}
              </div>
            </div>
          </div>

          <div>
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductPage;
