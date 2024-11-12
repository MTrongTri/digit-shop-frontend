import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function CategoriesPage() {
  return (
    <div className="mt-10">
      <div>
        <h2 className="text-2xl font-bold">Danh mục sản phẩm</h2>
      </div>

      <div className="mt-8">
        <Link
          to="/admin/categories/create"
          className="rounded-md bg-primary p-3 text-white"
        >
          Thêm danh mục
        </Link>
      </div>

      <div className="mt-8 max-h-[400px] overflow-x-auto rounded-md bg-white p-6 pt-0">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Ảnh</th>
              <th>Icon</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>
                  <div className="flex gap-4">
                    <Link className="tooltip" data-tip="Chỉnh sửa">
                      <FaRegEdit className="size-4 text-primary" />
                    </Link>
                    <Link className="tooltip" data-tip="Xóa">
                      <FaRegTrashAlt className="size-4 text-red-400" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination currentPage={1} totalPage={10} />
      </div>
    </div>
  );
}

export default CategoriesPage;
