import ChooseFileInput from "@/components/Input/ChooseFileInput";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";

function CreateCategoryPage() {
  return (
    <div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">Danh mục sản phẩm</h2>
      </div>

      <div className="mt-6 h-[540px] bg-white p-8">
        <form className="flex flex-col gap-10">
          <FloatingLabelInput label="Tên danh mục" type="text" id="cate-name" />
          <FloatingLabelInput label="Mô tả" type="text" id="cate-desc" />

          <div className="flex gap-6">
            <div>
              <span>Ảnh hiển thị</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ChooseFileInput />
              </div>
            </div>

            <div>
              <span>Icon</span>
              <div className="mt-2 aspect-square w-[200px]">
                <ChooseFileInput />
              </div>
            </div>
          </div>

          <div>
            <button className="float-end rounded-md bg-primary px-6 py-2 text-white">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategoryPage;
