import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Error/ErrorMessage";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import ImgUpload from "@/components/Input/ImgUpload";
import Select from "@/components/Input/Select/Select";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { getAllBrand } from "@/services/brandService";
import { getAllCategory } from "@/services/categoryService";
import { createProduct } from "@/services/productService";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateProductPage() {
  const [categoriesData, setCategoriesData] = useState({
    categories: [],
    loading: false,
    error: false,
  });
  const [brandsData, setBrandsData] = useState({
    brands: [],
    loading: false,
    error: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [deletePreviewImg, setDeletePreviewimg] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productData, setProductData] = useState(null);

  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      images: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setCategoriesData((prevState) => ({ ...prevState, loading: true }));
      setBrandsData((prevState) => ({ ...prevState, loading: true }));
      const { statusCode: statusCodeCate, data: cateData } =
        await getAllCategory();
      if (statusCodeCate === 200) {
        setCategoriesData({
          categories: cateData,
          loading: false,
          error: false,
        });
      } else {
        setCategoriesData((prevState) => ({ ...prevState, error: true }));
        navigate("/server-error");
      }

      const { statusCode: statusCodeBrand, data: brandData } =
        await getAllBrand();
      if (statusCodeBrand === 200) {
        setBrandsData({
          brands: brandData,
          loading: false,
          error: false,
        });
      } else {
        setBrandsData((prevState) => ({ ...prevState, error: true }));
        navigate("/server-error");
      }

      setCategoriesData((prevState) => ({ ...prevState, loading: false }));
      setBrandsData((prevState) => ({ ...prevState, loading: false }));
    };

    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    setIsOpenModal(true);

    const { images, thumbnail: thumbnailId } = formData;
    const imagesId = images.filter((sdImage) => !!sdImage);
    imagesId.unshift(thumbnailId);

    delete formData.images;
    delete formData.thumbnail;

    setProductData({
      ...formData,
      imagesId,
      thumbnailId,
    });
  };

  const handleConfirm = async () => {
    const { statusCode } = await createProduct(productData);

    if (statusCode === 201) {
      toast.success("Đã thêm sản phẩm thành công");
      reset();
      setDeletePreviewimg(true);
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
              id="prod-name"
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
              id="prod-description"
              control={control}
              rules={{ required: "Mô tả không được bỏ trống" }}
              className={clsx(errors.description && "border-red-500")}
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>

          <div className="flex gap-8">
            <div>
              <Select
                name={"categoryId"}
                control={control}
                rules={{ required: "Vui lòng chọn danh mục sản phẩm" }}
                className={clsx(errors.brandId && "border-red-500")}
              >
                <option>Danh mục sản phẩm</option>
                {categoriesData.categories.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </Select>

              {errors.categoryId && (
                <ErrorMessage message={errors.categoryId.message} />
              )}
            </div>

            <div>
              <Select
                name={"brandId"}
                control={control}
                rules={{ required: "Vui lòng chọn thương hiệu" }}
                className={clsx(errors.brandId && "border-red-500")}
              >
                <option>Thương hiệu</option>
                {brandsData.brands.map((brand) => (
                  <option key={brand.Id} value={brand.Id}>
                    {brand.name}
                  </option>
                ))}
              </Select>

              {errors.brandId && (
                <ErrorMessage message={errors.brandId.message} />
              )}
            </div>

            <div>
              <FloatingLabelInput
                label="Giá bán"
                name="price"
                type="number"
                id="price"
                control={control}
                rules={{ required: "Vui lòng nhập giá" }}
                min={0}
                className={clsx(errors.price && "border-red-500")}
              />
              {errors.price && <ErrorMessage message={errors.price.message} />}
            </div>

            <div className="flex-1">
              <FloatingLabelInput
                label="Số lượng tồn kho"
                name="stockQuantity"
                type="number"
                id="stock-quantity"
                control={control}
                rules={{ required: "Vui lòng nhập số lượng tồn kho" }}
                min={0}
                className={clsx(errors.stockQuantity && "border-red-500")}
              />
              {errors.stockQuantity && (
                <ErrorMessage message={errors.stockQuantity.message} />
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <div>
              <span>Thumbnail</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ImgUpload
                  id="thumbnail"
                  name="thumbnail"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  setIsUploading={setIsUploading}
                  delePreviewImg={deletePreviewImg}
                  className={clsx(errors.thumbnail && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.thumbnail && (
                  <ErrorMessage message={errors.thumbnail.message} />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <span>Ảnh {index + 1}</span>
                <div className="mt-2 aspect-square w-[200px]">
                  <ImgUpload
                    id={`"images-${index}"`}
                    name={`images.${index}`}
                    control={control}
                    setIsUploading={setIsUploading}
                    delePreviewImg={deletePreviewImg}
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button
              type="submit"
              disabled={isUploading}
              className={clsx("disabled:cursor-not-allowed")}
            >
              Thêm
            </Button>
          </div>
        </form>
      </div>

      {isOpenModal && (
        <ModalConfirm
          heading="Xác nhận thêm sản phẩm"
          message="Bạn có chắn là muốn thêm 1 sản phẩm không?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default CreateProductPage;
