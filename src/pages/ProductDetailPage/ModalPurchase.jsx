import FloatingLabelInput from "@/components/Input/FloatingLabelInput";
import FloatingLabelInputNumber from "@/components/Input/FloatingLabelInputNumber";
import ModalContainer from "@/components/Modal/ModalContainer";
import { images } from "@/constants";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { IoMdClose } from "react-icons/io";

function ModalPurchase() {
  const [showModal, setShowModal] = useState(true);

  const { control, handleSubmit, register } = useForm();

  const handleSubmitForm = (formData) => {
    console.log(formData);
  };

  return (
    <ModalContainer isShow={showModal}>
      <div className="flex h-full">
        <div className="m-auto w-[70%] rounded-md bg-white p-4 pb-8">
          <div className="relative">
            <h1 className="text-center text-lg font-semibold">
              Thông tin đặt hàng
            </h1>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 pr-0"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <div className="my-4 h-[2px] w-full bg-gray-300"></div>

          <div className="mt-10 h-[500px] overflow-y-auto">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="flex gap-4">
                <div className="flex basis-1/2 flex-col gap-8 border-r border-r-gray-300 p-3">
                  <h2 className="font-semibold">Thông tin giao hàng</h2>

                  <FloatingLabelInput
                    label="Tên người đặt"
                    id="name"
                    name="name"
                    control={control}
                  />
                  <FloatingLabelInputNumber
                    label="Số điện thoại"
                    id="phoneNumber"
                    name="phoneNumber"
                    control={control}
                  />
                  <FloatingLabelInput
                    label="Địa chỉ"
                    id="shippingAddress"
                    name="shippingAddress"
                    control={control}
                  />
                  <FloatingLabelInput
                    label="Ghi chú"
                    id="note"
                    name="note"
                    control={control}
                  />
                </div>

                <div className="flex h-[380px] basis-1/2 flex-col gap-8 overflow-y-auto p-3">
                  <h2 className="font-semibold">Thông tin đơn hàng</h2>

                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        className="h-[80px] w-[80px]"
                        src="https://cdn.tgdd.vn/Products/Images/42/323014/TimerThumb/vivo-y100-128gb-(4).jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <span>Điện thoại Xiaomi</span>
                    </div>
                    <div>
                      <span className="font-semibold text-red-500">
                        10.000.000đ
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Số lượng: 10</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        className="h-[80px] w-[80px]"
                        src="https://cdn.tgdd.vn/Products/Images/42/323014/TimerThumb/vivo-y100-128gb-(4).jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <span>Điện thoại Xiaomi</span>
                    </div>
                    <div>
                      <span className="font-semibold text-red-500">
                        10.000.000đ
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Số lượng: 10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 px-3">
                <p className="font-semibold">Hình thức thanh toán</p>
                <div className="grid grid-cols-3 gap-4 py-3">
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        defaultChecked
                        {...register("paymentMethod")}
                        type="radio"
                        name="paymentMethod"
                        className="radio-primary radio"
                        value="CRASHONDELIVERY"
                      />
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        name="paymentMethod"
                        value="VNPAY"
                        className="radio-primary radio"
                      />
                      Thanh toán qua VNPAY
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4 p-3">
                <p className="text-xl font-semibold">
                  Tổng giá trị đơn hàng: 10.000.000đ
                </p>
              </div>

              <div className="mt-8">
                <button className="w-full rounded-md bg-primary py-3 text-white hover:opacity-80">
                  Đặt hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ModalPurchase;
