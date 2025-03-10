import ErrorMessage from "@/components/Error/ErrorMessage";
import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import FloatingLabelInputNumber from "@/components/Input/FloatingLabelInputNumber";
import ModalContainer from "@/components/Modal/ModalContainer";
import { images } from "@/constants";
import { deleteCartItemsByProductIds } from "@/services/cartService";
import { createOrder } from "@/services/orderService";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ModalPurchase({ openModal, setOpenModal, products = [] }) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (formData) => {
    const orderItems = products.map((item) => ({
      productId: item.productId,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalPrice = orderItems.reduce(
      (total, curr) => total + curr.price * curr.quantity,
      0,
    );

    try {
      setIsLoading(true);
      const {
        data: { order, payment },
      } = await createOrder({ ...formData, totalPrice, orderItems });

      const { paymentMethod } = formData;

      if (paymentMethod === "COD") {
        navigate(
          `/orders/${order.orderCode}/status?isCOD=1&orderCode=${order.orderCode}`,
        );
      } else if (paymentMethod === "VN_PAY") {
        if (payment) {
          window.location.href = payment.vnpUrl;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!openModal) return;

  return (
    <ModalContainer>
      <div className="m-auto rounded-md bg-white p-4 pb-8 md:w-[70%]">
        <div className="relative">
          <h1 className="text-center text-lg font-semibold">
            Thông tin đặt hàng
          </h1>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 pr-0"
            onClick={() => setOpenModal(false)}
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="my-4 h-[2px] w-full bg-gray-300"></div>

        <div className="mt-10 h-[500px] overflow-y-auto">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex basis-1/2 flex-col gap-8 border-r border-r-gray-300 p-3">
                <h2 className="font-semibold">Thông tin giao hàng</h2>

                <div>
                  <FloatingLabelInput
                    label="Tên người đặt"
                    id="name"
                    name="name"
                    rules={{ required: "Vui lòng nhập tên người nhận" }}
                    control={control}
                    className={errors.name && "border-red-500"}
                  />

                  {errors.name && (
                    <ErrorMessage message={errors.name.message} />
                  )}
                </div>

                <div>
                  <FloatingLabelInputNumber
                    label="Số điện thoại"
                    id="phoneNumber"
                    name="phoneNumber"
                    rules={{
                      required: "Vui lòng nhập số điện thoại nhận hàng",
                    }}
                    control={control}
                    className={errors.phoneNumber && "border-red-500"}
                  />

                  {errors.phoneNumber && (
                    <ErrorMessage message={errors.phoneNumber.message} />
                  )}
                </div>

                <div>
                  <FloatingLabelInput
                    label="Địa chỉ"
                    id="shippingAddress"
                    name="shippingAddress"
                    rules={{ required: "Vui lòng nhập địa chỉ giao hàng" }}
                    control={control}
                    className={errors.shippingAddress && "border-red-500"}
                  />

                  {errors.shippingAddress && (
                    <ErrorMessage message={errors.shippingAddress.message} />
                  )}
                </div>

                <div>
                  <FloatingLabelInput
                    label="Ghi chú"
                    id="note"
                    name="note"
                    control={control}
                  />
                </div>
              </div>

              <div className="flex h-[380px] basis-1/2 flex-col gap-8 overflow-y-auto p-3">
                <h2 className="font-semibold">Thông tin đơn hàng</h2>

                {openModal &&
                  products.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4"
                    >
                      <div>
                        <img
                          className="h-[80px] w-[80px] object-contain"
                          src={item.thumbnailUrl}
                          alt=""
                        />
                      </div>
                      <div className="flex-1">
                        <span className="line-clamp-2">{item.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-red-500">
                          {Number(item.price).toLocaleString("vie")}đ
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-4 px-3">
              <p className="font-semibold">Hình thức thanh toán</p>
              <div className="grid grid-cols-1 gap-4 py-3 md:grid-cols-3">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      defaultChecked
                      {...register("paymentMethod")}
                      type="radio"
                      name="paymentMethod"
                      className="radio-primary radio"
                      value="COD"
                    />
                    <img className="w-[60px]" src={images.PaymentCOD} alt="" />
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      name="paymentMethod"
                      value="VN_PAY"
                      className="radio-primary radio"
                    />
                    <img className="w-[60px]" src={images.PaymentVNP} alt="" />
                    Thanh toán qua VNPAY
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4 p-3">
              <p className="text-xl font-semibold">
                Tổng giá trị đơn hàng:{" "}
                <span className="font-bold text-red-500">
                  {openModal &&
                    products
                      .reduce(
                        (total, curr) => total + curr.price * curr.quantity,
                        0,
                      )
                      .toLocaleString("vie")}
                  đ
                </span>
              </p>
            </div>

            <div className="mt-8">
              <button
                className="w-full rounded-md bg-primary py-3 text-white hover:opacity-80"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Đặt hàng"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ModalPurchase;
