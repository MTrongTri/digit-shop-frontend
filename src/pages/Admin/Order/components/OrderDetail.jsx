import ModalConfirm from "@/components/Modal/ModalConfirm";
import OrderItem from "@/pages/UserPage/components/OrderItem";
import { updateStatus } from "@/services/orderService";
import { hideLoading, showLoading } from "@/stores/loadingSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ORDER_STATUS_MAP = {
  DELIVERED: "#22c55e",
  CANCELED: "#ef4444",
  PENDING: "#f59e0b",
  INTRANSIT: "#3b82f6",
  PROCESSING: "#0ea5e9",
  OUTFORDELIVERY: "#9333ea",
  CONFIRMED: "#16a34a",
};

function OrderDetail({ order }) {
  const [showModal, setShowModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const handleChangeOrderStatus = async () => {
    try {
      dispatch(showLoading());
      await updateStatus(orderId, orderStatus);
      setShowModal(false);
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 border-b-2 pb-8" key={order.Id}>
      <div className="flex justify-between border-b-2 py-4">
        <div>
          <div>
            <span className="font-semibold">Mã đơn hàng: </span>
            <span>{order.orderCode}</span>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            <span>
              Trạng thái:
              <select
                defaultValue={orderStatus}
                style={{ color: ORDER_STATUS_MAP[orderStatus] }}
                className="select"
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  setShowModal(true);
                }}
              >
                {Object.keys(ORDER_STATUS_MAP).map((status) => (
                  <option
                    key={status}
                    value={status}
                    style={{ color: ORDER_STATUS_MAP[status] }}
                  >
                    {status}
                  </option>
                ))}
              </select>
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
      </div>

      {/* Modal */}
      <ModalConfirm
        heading="Thay đổi trạng thái đơn hàng"
        message="Bạn có chắc muốn thay đổi trạng thái đơn hàng này không?"
        setIsShow={setShowModal}
        isShow={showModal}
        onConfirm={handleChangeOrderStatus}
      />
    </div>
  );
}

export default OrderDetail;
