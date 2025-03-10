import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { BiError } from "react-icons/bi";
import { paymentVNPIPN } from "@/services/PaymentService";

function OrderStatusPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = Object.fromEntries(searchParams.entries());
  const orderCode = searchQuery["orderCode"]
    ? searchQuery["orderCode"]
    : searchQuery["vnp_TxnRef"];

  useEffect(() => {
    const fetchVNPIPN = async () => {
      try {
        const { data } = await paymentVNPIPN(searchQuery);
        if (data.vnpayCode === "01") {
          setIsSuccess(true);
        }
      } catch (error) {
        setIsFailure(true);
        console.error(error);
      }
    };

    if (!searchQuery["isCOD"]) {
      fetchVNPIPN();
    }
  });

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="mx-auto mt-[180px] h-fit w-fit text-2xl font-semibold">
        {(searchQuery["isCOD"] || isSuccess) && (
          <>
            <div className="flex items-center gap-3">
              <span className="rounded-full border-2 border-green-300 bg-green-100 p-3 text-green-400">
                <FaCheck className="text-3xl" />
              </span>
              <span>Đặt hàng thành công</span>
            </div>
            <div className="mt-4 flex">
              <Link
                to={`/orders/${orderCode}`}
                className="mx-auto text-sm hover:text-primary hover:opacity-70"
              >
                Xem chi tiết đơn hàng
              </Link>
            </div>
          </>
        )}

        {isFailure && (
          <div className="flex items-center gap-3">
            <span className="rounded-full border-2 border-red-300 bg-red-100 p-3 text-red-400">
              <BiError className="text-3xl" />
            </span>
            <span>Đã có lỗi xảy ra</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderStatusPage;
