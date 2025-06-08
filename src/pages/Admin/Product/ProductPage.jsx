import React, { useEffect, useState } from "react";
import TableManageContainer from "@/components/Container/TableManageContainer";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import { getProductAdminPage } from "@/services/productService";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import toast from "react-hot-toast";

function ProductPage() {
  const [products, setProducts] = useState({
    data: [],
    totalPage: 0,
    loading: false,
    error: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchproducts = async () => {
      setProducts((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getProductAdminPage({ currentPage });
        setProducts({
          data: data.items,
          totalPage: data.totalPage,
          loading: false,
          error: false,
        });
      } catch (error) {
        toast.error("Đã có lỗi xảy ra");
        setProducts((prevState) => ({ ...prevState, error: true }));
      } finally {
        setProducts((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchproducts();
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
        {products.error ? (
          <div className="text-center">
            <span className="text-red-500">
              Đã có lỗi xảy ra, vui lòng thử lại
            </span>
          </div>
        ) : products.loading ? (
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
              {products.data.map((prod) => (
                <tr key={prod.Id}>
                  <td>{prod.name}</td>
                  <td>
                    <div className="mask h-12 w-12">
                      <img src={`${prod.thumbnailUrl}`} alt="icon cate" />
                    </div>
                  </td>
                  <td>{Number(prod.price).toLocaleString("Vi")}đ</td>
                  <td>{prod.stockQuantity}</td>
                  <td>{prod.isActive ? "Còn" : "Ngừng kinh doanh"}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link to={`/admin/products/update/${prod.Id}`}>
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
          totalPage={products.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductPage;
