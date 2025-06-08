import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";

import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getCategoriesPage } from "@/services/categoryService";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import TableManageContainer from "@/components/Container/TableManageContainer";

function CategoriesPage() {
  const [categories, setCategories] = useState({
    data: [],
    totalPage: 0,
    loading: false,
    error: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      setCategories((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getCategoriesPage(currentPage, 4);
        setCategories({
          data: data.items,
          totalPage: data.totalPage,
          loading: false,
          error: false,
        });
      } catch (error) {
        setCategories((prevState) => ({ ...prevState, error: true }));
      } finally {
        setCategories((prevState) => ({ ...prevState, loading: false }));
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
        {categories.error ? (
          <div className="text-center">
            <span className="text-red-500">
              Đã có lỗi xảy ra, vui lòng thử lại
            </span>
          </div>
        ) : categories.loading ? (
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
              {categories.data.map((cate) => (
                <tr key={cate.id}>
                  <td>{cate.name}</td>
                  <td>{cate.description}</td>
                  <td>
                    <div className="mask h-12 w-12">
                      <img src={`${cate.imgUrl}`} alt="Img cate" />
                    </div>
                  </td>
                  <td>
                    <div className="mask h-12 w-12">
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
          totalPage={categories.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CategoriesPage;
