import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Error/ErrorMessage";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import ImgUpload from "@/components/Input/ImgUpload";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import {
  createBrand,
  getBrandById,
  updateBrand,
} from "@/services/brandService";
import { hideLoading, showLoading } from "@/stores/loadingSlice";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBrandPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [brand, setBrand] = useState({
    data: [],
    loading: false,
    error: false,
  });
  const [brandUpdateData, setBrandUpdateData] = useState(null);
  const { id: brandId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    const fetchData = async () => {
      setBrand((prevState) => ({ ...prevState, loading: true }));
      const { statusCode, data } = await getBrandById(brandId);
      if (statusCode < 400) {
        setBrand((prevState) => ({ ...prevState, data: data }));

        reset({
          name: data.name,
          imgId: data.img.Id,
        });
      } else {
        navigate("/server-error");
      }

      setBrand((prevState) => ({ ...prevState, loading: false }));
    };

    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    setIsOpenModal(true);
    setBrandUpdateData(formData);
  };

  const handleConfirm = async () => {
    dispatch(showLoading());
    setIsOpenModal(false);
    try {
      await updateBrand({
        id: brandId,
        data: brandUpdateData,
      });
      toast.success("Cập nhật thương hiệu thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      dispatch(hideLoading());
    }
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
                  url={brand.data?.img?.url}
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

      {/* Modal */}
      <ModalConfirm
        heading="Xác nhận cập nhật"
        message="Bạn có chắn là muốn cập nhật thương hiệu này không?"
        isShow={isOpenModal}
        setIsShow={setIsOpenModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default UpdateBrandPage;
