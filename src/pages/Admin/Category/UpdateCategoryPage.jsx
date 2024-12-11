import FloatingLabelInput from "@/components/Input/FloatingLabelInput";

import { useForm } from "react-hook-form";
import clsx from "clsx";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Button from "@/components/Button/Button";
import ImgUpload from "@/components/Input/ImgUpload";
import { getCategoryById, updateCategory } from "@/services/categoryService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/stores/loadingSlice";

function UpdateCategoryPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cateData, setCateData] = useState(null);
  const [cateUpdateData, setCateUpdateData] = useState(null);
  const { id: cateId } = useParams();
  const dispatch = useDispatch();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getCategoryById(cateId);
        setCateData(data);
        reset({
          name: data.name,
          description: data.description,
          imgId: data.img?.Id,
          iconId: data.icon?.Id,
        });
      } catch (error) {
        toast.error("Đã có lỗi xảy ra");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    setIsOpenModal(true);
    setCateUpdateData(formData);
  };

  const handleConfirm = async () => {
    dispatch(showLoading());
    setIsOpenModal(false);
    try {
      await updateCategory({
        id: cateId,
        data: cateUpdateData,
      });
      toast.success("Cập nhật danh mục sản phẩm thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Chỉnh sửa danh mục sản phẩm</h2>
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
                  url={cateData?.img.url}
                  className={clsx(errors.imgId && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.imgId && (
                  <ErrorMessage message={errors.imgId.message} />
                )}
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
                  url={cateData?.icon.url}
                  className={clsx(errors.iconId && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.iconId && (
                  <ErrorMessage message={errors.iconId.message} />
                )}
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" disabled={isUploading}>
              Cập nhật
            </Button>
          </div>
        </form>
      </div>

      {isOpenModal && (
        <ModalConfirm
          heading="Xác nhận chỉnh sửa danh mục sản phẩm"
          message="Bạn có chắn là muốn cập nhật danh mục sản phẩm này không?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default UpdateCategoryPage;
