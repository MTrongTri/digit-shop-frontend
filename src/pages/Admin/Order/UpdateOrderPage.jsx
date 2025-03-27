import { useParams } from "react-router-dom";
import OrderDetail from "./components/OrderDetail";
import { useEffect, useState } from "react";
import OrderShipping from "./components/OrderShipping,";
import clsx from "clsx";
import { getOrderById } from "@/services/orderService";
import toast from "react-hot-toast";
import LoadingCircleFullScreen from "@/components/Loading/LoadingCircleFullScreen";

function UpdateOrderPage() {
  const { orderId } = useParams();
  const [tabSelected, setTabSelected] = useState("info");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const { data } = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (isLoading) return <LoadingCircleFullScreen />;

  if (!order) return;

  return (
    <div>
      <div className="rounded-md bg-white p-4">
        <div className="flex items-center gap-4 border-b border-b-gray-200 py-4">
          <button
            className={clsx("px-4 py-2", {
              "border-b-2 border-b-primary": tabSelected === "info",
            })}
            onClick={() => setTabSelected("info")}
          >
            Thông tin đơn hàng
          </button>
          <button
            className={clsx("px-4 py-2", {
              "border-b-2 border-b-primary": tabSelected === "shipping",
            })}
            onClick={() => setTabSelected("shipping")}
          >
            Thông tin vận chuyển
          </button>
        </div>

        <div>
          {tabSelected === "info" ? (
            <OrderDetail order={order} />
          ) : (
            <OrderShipping shipping={order.shipping} />
          )}
        </div>

        {/* <ModalConfirm
          heading="Hủy đơn hàng"
          message="Bạn có chắc là muốn hủy đơn hàng này không?"
          isShow={isModalVisible}
          setIsShow={setModalVisible}
          onConfirm={handleCancelOrder}
        /> */}
      </div>
    </div>
  );
}

export default UpdateOrderPage;
