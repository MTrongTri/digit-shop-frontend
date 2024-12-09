import FloatingLabelInput from "@/components/Input/FloatingLabelInput";

import { useForm } from "react-hook-form";
import clsx from "clsx";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Button from "@/components/Button/Button";
import ImgUpload from "@/components/Input/ImgUpload";
import { createCategory } from "@/services/categoryService";
import toast from "react-hot-toast";
import { useState } from "react";
import ModalConfirm from "@/components/Modal/ModalConfirm";

function CreateCategoryPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [resetPreviewImg, setResetPreviewImg] = useState(false);
  const [cateData, setCateData] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    setIsOpenModal(true);
    setCateData(formData);
  };

  const handleConfirm = async () => {
    const { statusCode } = await createCategory(cateData);

    if (statusCode === 201) {
      reset();
      setResetPreviewImg(true);
      toast.success("Tạo danh mục sản phẩm thành công");
    } else {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }

    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Danh mục sản phẩm</h2>
      </div>

      <div className="mt-6 h-[540px] overflow-y-auto bg-white p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div>
            <FloatingLabelInput
              label="Tên danh mục"
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
              <span>Ảnh hiển thị</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ImgUpload
                  id="img"
                  name="imgId"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  setIsUploading={setIsUploading}
                  resetPreviewImg={resetPreviewImg}
                  setResetPreviewImg={setResetPreviewImg}
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
                  name="iconId"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  setIsUploading={setIsUploading}
                  resetPreviewImg={resetPreviewImg}
                  setResetPreviewImg={setResetPreviewImg}
                  className={clsx(errors.icon && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.icon && <ErrorMessage message={errors.icon.message} />}
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" disabled={isUploading}>
              Thêm
            </Button>
          </div>
        </form>
      </div>

      {isOpenModal && (
        <ModalConfirm
          heading="Xác nhận thêm danh mục sản phẩm"
          message="Bạn có chắn là muốn thêm 1 danh mục sản phẩm không?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default CreateCategoryPage;
