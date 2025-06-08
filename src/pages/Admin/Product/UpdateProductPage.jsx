import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Error/ErrorMessage";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import ImgUpload from "@/components/Input/ImgUpload";
import Select from "@/components/Input/Select/Select";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { getAllBrand } from "@/services/brandService";
import { getAllCategory } from "@/services/categoryService";
import { getProductById, updateProduct } from "@/services/productService";
import { hideLoading, showLoading } from "@/stores/loadingSlice";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProductPage() {
  const [categories, setCategories] = useState({
    data: [],
    loading: false,
    error: false,
  });
  const [brands, setBrands] = useState({
    data: [],
    loading: false,
    error: false,
  });

  const [product, setProduct] = useState({
    data: [],
    loading: false,
    error: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productUpdateData, setProductUpdateData] = useState(null);

  const navigate = useNavigate();
  const { id: productId } = useParams();
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
      setCategories((prevState) => ({ ...prevState, loading: true }));
      setBrands((prevState) => ({ ...prevState, loading: true }));
      setProduct((prevState) => ({ ...prevState, loading: true }));
      try {
        const { statusCode: statusCodeCate, data: cateData } =
          await getAllCategory();
        if (statusCodeCate === 200) {
          setCategories({
            data: cateData,
            loading: false,
            error: false,
          });
        }

        const { statusCode: statusCodeBrand, data: brandData } =
          await getAllBrand();
        if (statusCodeBrand === 200) {
          setBrands({
            data: brandData,
            loading: false,
            error: false,
          });
        }

        const { statusCode: statusCodeProduct, data: productData } =
          await getProductById(productId);

        setProduct({
          data: productData,
          loading: false,
          error: false,
        });

        reset({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stockQuantity: productData.stockQuantity,
          thumbnailId: productData.thumbnail.imgId,
          imagesId: productData.images.map((image) => image.imgId),
          categoryId: productData.category.id,
          brandId: productData.brand.id,
          active: productData.isActive,
        });
      } catch (error) {
        toast.error("Đã có lỗi xảy ra");
      } finally {
        setCategories((prevState) => ({ ...prevState, loading: false }));
        setBrands((prevState) => ({ ...prevState, loading: false }));
        setProduct((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchData();
  }, []);

  const onSubmit = (formData) => {
    setIsOpenModal(true);

    const imagesId = formData.imagesId.filter((i) => !!i);
    setProductUpdateData({ ...formData, imagesId });
  };

  const handleConfirm = async () => {
    dispatch(showLoading());
    setIsOpenModal(false);
    try {
      await updateProduct({
        id: productId,
        data: productUpdateData,
      });
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      dispatch(hideLoading());
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
                defaultValue={product.data.category?.id}
              >
                <option>Danh mục sản phẩm</option>
                {categories.data.map((cate) => (
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
                defaultValue={product.data.brand?.id}
              >
                <option>Thương hiệu</option>
                {brands.data.map((brand) => (
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
              <Select
                name={"active"}
                control={control}
                defaultValue={product.data.isActive ? "true" : "false"}
              >
                <option value={"true"}>Đang kinh doanh</option>
                <option value={"false"}>Ngừng kinh doanh</option>
              </Select>
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
                  name="thumbnailId"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  url={product.data.thumbnail?.url}
                  setIsUploading={setIsUploading}
                  className={clsx(errors.thumbnailId && "border-red-500")}
                  accept="image/png, image/jpg, image/jpeg"
                />
                {errors.thumbnailId && (
                  <ErrorMessage message={errors.thumbnailId.message} />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <div key={index}>
                  <span>Ảnh {index + 1}</span>
                  <div className="mt-2 aspect-square w-[200px]">
                    <ImgUpload
                      id={`"images-${index}"`}
                      name={`imagesId.${index}`}
                      control={control}
                      url={
                        product.data.images
                          ? product.data.images[index]?.url
                          : null
                      }
                      setIsUploading={setIsUploading}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                  </div>
                </div>
              );
            })}
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

      {/* Modal */}
      <ModalConfirm
        heading="Xác nhận cập nhật sản phẩm"
        message="Bạn có chắn là muốn cập nhật sản phẩm này không?"
        isShow={isOpenModal}
        setIsShow={setIsOpenModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default UpdateProductPage;
