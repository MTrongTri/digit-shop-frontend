import TableManageContainer from "@/components/Container/TableManageContainer";
import Pagination from "@/components/Pagination";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { getOrderAdminWithFilter } from "@/services/orderService";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const ORDER_STATUS_MAP = {
  DELIVERED: "#22c55e",
  CANCELED: "#ef4444",
  PENDING: "#f59e0b",
  INTRANSIT: "#3b82f6",
  PROCESSING: "#0ea5e9",
  OUTFORDELIVERY: "#9333ea",
  CONFIRMED: "#16a34a",
};

const PAYMENT_STATUS_MAP = {
  PENDING: "#f59e0b",
  COMPLETED: "#22c55e",
};

function OrderPage() {
  const [orders, setOrders] = useState({
    data: [],
    totalPage: 1,
    loading: false,
    error: false,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [orderStatus, setOrderStatus] = useState("");
  const [keySearch, setKeySearch] = useState("");
  const debounceKeySearch = useDebounce(keySearch, 500);

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getOrderAdminWithFilter({
          keySearch: debounceKeySearch,
          type: orderStatus === "all" ? null : orderStatus,
          pageNo: currentPage,
          pageSize: 12,
        });
        setOrders({
          data: data.items,
          totalPage: data.totalPage,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error(error);
        toast.error("Đã có lỗi xảy ra");
        setOrders((prevState) => ({ ...prevState, error: true }));
      } finally {
        setOrders((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchOrders();
  }, [currentPage, debounceKeySearch, orderStatus]);

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-2xl font-bold">Đơn hàng</h2>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="relative col-span-6 w-[600px]">
          <div>
            <input
              type="text"
              className="w-full border-gray-600 px-4 py-2 text-sm outline-none"
              placeholder="Nhập mã đơn hàng để tìm kiếm"
              onChange={(e) => setKeySearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <CiSearch />
            </button>
          </div>
        </div>

        <div>
          <select
            defaultValue="Pick a color"
            className="select"
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="all">Tất cả</option>
            {Object.keys(ORDER_STATUS_MAP).map((status) => (
              <option
                key={status}
                style={{ color: ORDER_STATUS_MAP[status] }}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TableManageContainer>
        {orders.error ? (
          <div className="text-center">
            <span className="text-red-500">
              Đã có lỗi xảy ra, vui lòng thử lại
            </span>
          </div>
        ) : orders.loading ? (
          <TableSkeleton />
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Tổng giá trị đơn hàng</th>
                <th>Trạng thái đơn hàng</th>
                <th>Trạng thái thanh toán</th>
                <th>Ngày đặt hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((order) => (
                <tr key={order.Id}>
                  <td>{order.orderCode}</td>
                  <td>{Number(order.totalPrice).toLocaleString("Vi")}đ</td>
                  <td
                    style={{ color: ORDER_STATUS_MAP[order.orderStatus] }}
                    className={clsx("font-semibold")}
                  >
                    {order.orderStatus}
                  </td>
                  <td
                    style={{ color: PAYMENT_STATUS_MAP[order.paymentStatus] }}
                    className={clsx("font-semibold")}
                  >
                    {order.paymentStatus}
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link to={`/admin/orders/update/${order.Id}`}>
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
          totalPage={orders.totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default OrderPage;
