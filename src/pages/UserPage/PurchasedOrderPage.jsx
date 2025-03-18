import ErrorMessage from "@/components/Error/ErrorMessage";
import LoadingDotsFullScreen from "@/components/Loading/LoadingDotsFullScreen";
import Pagination from "@/components/Pagination";
import { images } from "@/constants";
import { getOrderByUserFilter } from "@/services/orderService";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import OrderSection from "./components/OrderSection";

const MENU = [
  {
    title: "Tất cả",
    type: "all",
  },
  {
    title: "Đang vận chuyển",
    type: "INTRANSIT",
  },
  {
    title: "Chờ giao hàng",
    type: "OUTFORDELIVERY",
  },
  {
    title: "Hoàn thành",
    type: "DELIVERED",
  },
  {
    title: "Đã hủy",
    type: "CANCELED",
  },
];

function PurchasedOrderPage() {
  const [searchParams] = useSearchParams();

  return (
    <div id="orders-section" className="w-full rounded-md bg-white p-4 md:px-8">
      <div>
        <div className="overflow-x-auto">
          <ul className="flex justify-between gap-4">
            {MENU.map((item, index) => (
              <li
                key={index}
                className={clsx(
                  "flex-shrink-0 px-4 py-4 duration-300 last:-mx-4 hover:text-primary md:px-6 md:last:-mx-0",
                  {
                    "border-b-2 border-primary text-primary":
                      (!searchParams.get("type") && item.type === "all") ||
                      searchParams.get("type") === item.type,
                  },
                )}
              >
                <Link to={`/user/orders?type=${item.type}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* list orders */}
        <div>
          <OrderSection />
        </div>
      </div>
    </div>
  );
}

export default PurchasedOrderPage;
