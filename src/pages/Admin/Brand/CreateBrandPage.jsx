import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Error/ErrorMessage";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import ImgUpload from "@/components/Input/ImgUpload";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { createBrand } from "@/services/brandService";
import { showLoading } from "@/stores/loadingSlice";
import clsx from "clsx";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function CreateBrandPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [resetPreviewImg, setResetPreviewImg] = useState(false);
  const [brandData, setBrandData] = useState(null);
  const dispath = useDispatch();

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
    setBrandData(formData);
  };

  const handleConfirm = async () => {
    dispath(showLoading());
    setIsOpenModal(false);
    try {
      await createBrand(brandData);
      reset();
      setResetPreviewImg(true);
      toast.success("Tạo thương hiệu thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      dispath(showLoading());
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Thương hiệu</h2>
      </div>

      <div className="mt-6 h-[540px] overflow-y-auto bg-white p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div>
            <FloatingLabelInput
              label="Tên thương hiệu"
              name="name"
              type="text"
              id="brand-name"
              control={control}
              rules={{ required: "Tên không được bỏ trống" }}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>

          <div className="flex gap-6">
            <div>
              <span>Ảnh</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ImgUpload
                  id="img"
                  name="imgId"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  setIsUploading={setIsUploading}
                  resetPreviewImg={resetPreviewImg}
                  setResetPreviewImg={setResetPreviewImg}
                  className={clsx(errors.imgId && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.imgId && (
                  <ErrorMessage message={errors.imgId.message} />
                )}
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
          heading="Xác nhận thêm thương hiệu"
          message="Bạn có chắn là muốn thêm 1 thương hiệu không?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default CreateBrandPage;
