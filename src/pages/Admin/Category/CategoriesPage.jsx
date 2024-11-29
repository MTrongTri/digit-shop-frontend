import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCategoriesPage } from "@/services/categoryService";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import TableManageContainer from "@/components/Container/TableManageContainer";

function CategoriesPage() {
  const [categoriesData, setCategoriesData] = useState({
    categories: [],
    totalPage: 0,
    loading: false,
    error: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      setCategoriesData((prevState) => ({ ...prevState, loading: true }));
      const { statusCode, data } = await getCategoriesPage(currentPage, 4);
      if (statusCode === 200) {
        setCategoriesData({
          categories: data.items,
          totalPage: data.totalPage,
          loading: false,
          error: false,
        });
      } else {
        setCategoriesData((prevState) => ({ ...prevState, error: true }));
      }
    };

    fetchCategoriesData();
  }, [currentPage]);

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

      <TableManageContainer>
        {categoriesData.error ? (
          <div className="text-center">
            <span className="text-red-500">
              Đã có lỗi xảy ra, vui lòng thử lại
            </span>
          </div>
        ) : categoriesData.loading ? (
          <TableSkeleton />
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Ảnh</th>
                <th>Icon</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.categories.map((cate) => (
                <tr key={cate.id}>
                  <td>{cate.name}</td>
                  <td>{cate.description}</td>
                  <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={`${cate.imgUrl}`} alt="Img cate" />
                    </div>
                  </td>
                  <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={`${cate.iconUrl}`} alt="icon cate" />
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <Link
                        className="tooltip"
                        to={`/admin/categories/update/${cate.id}`}
                        data-tip="Chỉnh sửa"
                      >
                        <FaRegEdit className="size-4 text-primary" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TableManageContainer>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPage={categoriesData.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CategoriesPage;
