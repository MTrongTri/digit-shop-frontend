import React from "react";
import { Link } from "react-router-dom";

function OrderItem({ productId, thumbnail, productName, quantity, price }) {
  return (
    <div className="flex flex-col gap-4">
      <div key={productId} className="flex items-center justify-between gap-3">
        <Link to={`/products/${productId}`} className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={thumbnail}
              alt=""
              className="h-[80px] w-[80px] object-contain"
            />
          </div>

          <div>
            <span className="line-clamp-4 md:min-w-[300px]">{productName}</span>
          </div>
        </Link>

        <div>
          <span className="hidden md:block">Số lượng: {quantity}</span>
          <span className="md:hidden">x{quantity}</span>
        </div>

        <div>
          <span className="font-semibold text-red-500">
            {price.toLocaleString("vie")}đ
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
