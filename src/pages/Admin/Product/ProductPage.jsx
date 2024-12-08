import React, { useEffect, useState } from "react";
import TableManageContainer from "@/components/Container/TableManageContainer";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { getProductAdminPage } from "@/services/productService";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function ProductPage() {
  const [productsData, setproductsData] = useState({
    products: [],
    totalPage: 0,
    loading: false,
    error: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchproductsData = async () => {
      setproductsData((prevState) => ({ ...prevState, loading: true }));
      const { statusCode, data } = await getProductAdminPage({ currentPage });
      if (statusCode === 200) {
        setproductsData({
          products: data.items,
          totalPage: data.totalPage,
          loading: false,
          error: false,
        });
      } else {
        setproductsData((prevState) => ({ ...prevState, error: true }));
      }
    };

    fetchproductsData();
  }, [currentPage]);

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-2xl font-bold">Sản phẩm</h2>
      </div>

      <div className="mt-8">
        <Link
          to="/admin/products/create"
          className="rounded-md bg-primary p-3 text-white"
        >
          Thêm sản phẩm
        </Link>
      </div>

      <TableManageContainer>
        {productsData.error ? (
          <div className="text-center">
            <span className="text-red-500">
              Đã có lỗi xảy ra, vui lòng thử lại
            </span>
          </div>
        ) : productsData.loading ? (
          <TableSkeleton />
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Số lượng còn</th>
                <th>Còn kinh doanh</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {productsData.products.map((cate) => (
                <tr key={cate.Id}>
                  <td>{cate.name}</td>
                  <td>
                    <div className="mask h-12 w-12">
                      <img src={`${cate.thumbnailUrl}`} alt="icon cate" />
                    </div>
                  </td>
                  <td>{Number(cate.price).toLocaleString("Vi")}đ</td>
                  <td>{cate.stockQuantity}</td>
                  <td>{cate.isActive ? "Còn" : "Ngừng kinh doanh"}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link className="tooltip" data-tip="Chỉnh sửa">
                        <FaRegEdit className="size-4 text-primary" />
                      </Link>
                      <Link className="tooltip" data-tip="Xóa">
                        <FaRegTrashAlt className="size-4 text-red-400" />
                      </Link>
                      <Link>
                        <span className="text-primary">Chi tiết</span>
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
          totalPage={productsData.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductPage;
