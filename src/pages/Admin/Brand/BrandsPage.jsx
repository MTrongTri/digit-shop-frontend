import TableManageContainer from "@/components/Container/TableManageContainer";
import Pagination from "@/components/Pagination";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { getAllBrandPage } from "@/services/brandService";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function BrandsPage() {
  const [brands, setBrands] = useState({
    data: [],
    totalPage: 0,
    loading: false,
    error: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchBrandsData = async () => {
      setBrands((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getAllBrandPage(currentPage, 4);
        setBrands({
          data: data.items,
          totalPage: data.totalPage,
          loading: false,
          error: false,
        });
      } catch (error) {
      } finally {
        setBrands((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchBrandsData();
  }, [currentPage]);

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-2xl font-bold">Thương hiệu</h2>
      </div>

      <div className="mt-8">
        <Link
          to="/admin/brands/create"
          className="rounded-md bg-primary p-3 text-white"
        >
          Thêm thương hiệu
        </Link>
      </div>

      <TableManageContainer>
        {brands.error ? (
          <div className="text-center">
            <span className="text-red-500">
              Đã có lỗi xảy ra, vui lòng thử lại
            </span>
          </div>
        ) : brands.loading ? (
          <TableSkeleton />
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {brands.data.map((brand) => (
                <tr key={brand.Id}>
                  <td>{brand.name}</td>
                  <td>
                    <div className="mask h-12 w-12">
                      <img src={`${brand.imgUrl}`} alt="Img brand" />
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <Link
                        className="tooltip"
                        to={`/admin/brands/update/${brand.Id}`}
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
          totalPage={brands.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default BrandsPage;
