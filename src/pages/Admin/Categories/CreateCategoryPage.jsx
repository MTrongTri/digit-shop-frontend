import ChooseFileInput from "@/components/Input/ChooseFileInput";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import { IoIosWarning } from "react-icons/io";

import { useForm } from "react-hook-form";
import clsx from "clsx";

function CreateCategoryPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  console.log(errors);

  const onSubmit = (formData) => {
    console.log(formData);
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
            {errors.name && (
              <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                <IoIosWarning />
                <span>{errors.name.message}</span>
              </div>
            )}
          </div>

          <div>
            <FloatingLabelInput
              label="Mô tả"
              name="desc"
              type="text"
              id="cate-desc"
              control={control}
              rules={{ required: "Mô tả không được bỏ trống" }}
              className={clsx(errors.desc && "border-red-500")}
            />
            {errors.desc && (
              <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                <IoIosWarning />
                <span>{errors.desc.message}</span>
              </div>
            )}
          </div>

          <div className="flex gap-6">
            <div>
              <span>Ảnh hiển thị</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ChooseFileInput
                  id="img"
                  name="img"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  className={clsx(errors.img && "border-red-500")}
                />
                {errors.img && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                    <IoIosWarning />
                    <span>{errors.img.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <span>Icon</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ChooseFileInput
                  id="icon"
                  name="icon"
                  control={control}
                  rules={{ required: "Vui lòng chọn 1 ảnh" }}
                  className={clsx(errors.icon && "border-red-500")}
                />
                {errors.icon && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                    <IoIosWarning />
                    <span>{errors.icon.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="float-end rounded-md bg-primary px-6 py-2 text-white"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategoryPage;
