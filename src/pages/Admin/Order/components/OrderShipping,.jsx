import React from "react";

function OrderShipping({ shipping }) {
  return (
    <div className="mt-4 flex flex-col gap-4 px-4">
      <div className="flex items-center gap-2">
        <span>Tên người nhận:</span>
        <span>{shipping.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Địa chỉ nhận hàng:</span>
        <span>{shipping.shippingAddress}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Số điện thoại:</span>
        <span>{shipping.phoneNumber}</span>
      </div>
    </div>
  );
}

export default OrderShipping;
