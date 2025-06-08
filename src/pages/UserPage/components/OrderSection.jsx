import React, { useEffect, useState, useCallback } from "react";
import { MdLocalShipping } from "react-icons/md";
import OrderItem from "./OrderItem";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { getOrderByUserFilter, updateStatus } from "@/services/orderService";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { images } from "@/constants";
import LoadingDotsFullScreen from "@/components/Loading/LoadingDotsFullScreen";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Pagination from "@/components/Pagination";

const orderStatusMap = {
  DELIVERED: { text: "HOÀN THÀNH", color: "text-[#26aa99]" },
  CANCELED: { text: "ĐÃ HỦY", color: "text-red-500" },
  PENDING: { text: "CHỜ XÁC NHẬN", color: "text-primary" },
  INTRANSIT: { text: "ĐANG VẬN CHUYỂN", color: "text-[#26aa99]" },
  PROCESSING: { text: "ĐANG CHUẨN BỊ HÀNG", color: "text-[#26aa99]" },
  OUTFORDELIVERY: { text: "CHỜ GIAO HÀNG", color: "text-[#26aa99]" },
  CONFIRMED: { text: "ĐÃ XÁC NHẬN", color: "text-[#26aa99]" },
};

function OrderSection() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersData, setOrdersData] = useState({
    items: [],
    totalPages: 1,
    isLoading: false,
    hasError: false,
  });
  const currentUser = useSelector((state) => state.user.userInfo);

  const orderTypeFilter =
    searchParams.get("type") === "all" ? null : searchParams.get("type");

  const fetchOrders = useCallback(async () => {
    const userId = currentUser?.id;
    if (!userId) return;

    try {
      setOrdersData((prev) => ({ ...prev, isLoading: true, hasError: false }));
      const response = await getOrderByUserFilter(userId, {
        type: orderTypeFilter,
        pageNo: currentPage,
        pageSize: 8,
      });
      setOrdersData({
        items: response.data.items,
        totalPages: response.data.totalPage,
        isLoading: false,
        hasError: false,
      });
    } catch (error) {
      setOrdersData((prev) => ({ ...prev, isLoading: false, hasError: true }));
    }
  }, [currentUser?.id, orderTypeFilter, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setCurrentPage(0);
  }, [orderTypeFilter]);

  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;
    try {
      setIsCancelling(true);
      await updateStatus(selectedOrderId, "CANCELED");
      await fetchOrders();
      toast.success("Đã hủy đơn hàng");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsCancelling(false);
      setModalVisible(false);
      setSelectedOrderId(null);
    }
  };

  if (ordersData.isLoading) return <LoadingDotsFullScreen />;

  if (ordersData.hasError)
    return (
      <ErrorMessage message="Đã có lỗi xảy ra vui lòng thử lại hoặc liên hệ với quản trị viên để được giúp đỡ" />
    );

  if (ordersData.items.length === 0)
    return (
      <div className="flex py-20">
        <img src={images.EmptyImage} alt="Empty" className="mx-auto" />
      </div>
    );

  return (
    <div>
      {ordersData.items.map((order) => (
        <div
          className="mt-4 flex flex-col gap-3 border-b-2 pb-8"
          key={order.Id}
        >
          <div className="flex justify-between border-b-2 py-4">
            <div>
              <div>
                <span className="font-semibold">Mã đơn hàng: </span>
                <span>{order.orderCode}</span>
              </div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              {order.orderStatus === "DELIVERED" && (
                <div className="flex items-center gap-2 text-[#26aa99]">
                  <MdLocalShipping className="text-[24px]" />
                  <span>Giao hàng thành công</span>
                </div>
              )}
              <div className="h-full w-[2px] bg-gray-200"></div>
              <div>
                <span
                  className={`uppercase ${orderStatusMap[order.orderStatus].color}`}
                >
                  {orderStatusMap[order.orderStatus].text}
                </span>
              </div>
            </div>
          </div>

          {order.orderDetail.map((item) => (
            <OrderItem
              key={item.productId}
              productId={item.productId}
              productName={item.productName}
              thumbnail={item.thumbnail}
              quantity={item.quantity}
              price={item.price}
            />
          ))}

          <div>
            <div className="flex items-center justify-end gap-2 font-semibold">
              <span className="text-sm">Tổng tiền đơn hàng:</span>
              <span className="text-xl text-red-500">
                {order.totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>

            {order.orderStatus === "PENDING" && (
              <div className="mt-4">
                <button
                  disabled={isCancelling}
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedOrderId(order.Id);
                  }}
                  className="float-end rounded-md bg-red-500 px-8 py-2 text-white"
                >
                  {isCancelling ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Hủy"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {ordersData.items.length > 0 && (
        <div className="mt-4 flex">
          <div className="mx-auto">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={ordersData.totalPages}
            />
          </div>
        </div>
      )}

      <ModalConfirm
        heading="Hủy đơn hàng"
        message="Bạn có chắc là muốn hủy đơn hàng này không?"
        isShow={isModalVisible}
        setIsShow={setModalVisible}
        onConfirm={handleCancelOrder}
      />
    </div>
  );
}

export default OrderSection;
