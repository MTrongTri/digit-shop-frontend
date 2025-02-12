import Container from "@/components/Container";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMinusSmall, HiPlusSmall } from "react-icons/hi2";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      imgUrl:
        "https://res.cloudinary.com/do3fmak6r/image/upload/v1734311080/kv5ossnorqu6akqqfi4x.jpg",
      name: "Điện thoại Xiaomi 8GB/256GB",
      quantity: 1,
      price: 1000000,
      isSelected: false,
    },
    {
      id: 2,
      imgUrl:
        "https://res.cloudinary.com/do3fmak6r/image/upload/v1734311080/kv5ossnorqu6akqqfi4x.jpg",
      name: "Điện thoại Xiaomi 8GB/256GB",
      quantity: 2,
      price: 1000000,
      isSelected: false,
    },
  ]);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      item.isSelected ? total + item.price * item.quantity : total,
    0,
  );

  const handleSelectAll = (event) => {
    const updatedCart = cartItems.map((item) => ({
      ...item,
      isSelected: event.target.checked,
    }));
    setCartItems(updatedCart);
  };

  const handleSelectItem = (event, itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, isSelected: event.target.checked } : item,
    );
    setCartItems(updatedCart);
  };

  return (
    <Container>
      <div className="md:mt-4">
        <h1 className="hidden text-2xl font-semibold uppercase md:block">
          Giỏ hàng
        </h1>

        <div className="rounded-lg py-5">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Cart Items Section */}
            <div className="md:w-[75%]">
              {/* Header Row */}
              <div className="flex justify-between gap-2 rounded-lg bg-white px-4 py-3 md:grid md:grid-cols-7">
                <label
                  htmlFor="select-all"
                  className="col-span-3 flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="select-all"
                    checked={cartItems.every((item) => item.isSelected)}
                    onChange={handleSelectAll}
                    className="h-[20px] w-[20px]"
                  />
                  <span>Tất cả</span>
                </label>
                <span className="col-span-1 hidden md:block">Đơn giá</span>
                <span className="col-span-1 hidden md:block">Số lượng</span>
                <span className="col-span-1 hidden md:block">Thành tiền</span>
                <div className="col-span-1 flex justify-center">
                  <button className="hover:text-red-500">
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="mt-3 flex max-h-[420px] flex-col gap-8 overflow-y-auto rounded-lg bg-white px-4 py-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-7 items-center gap-2"
                  >
                    {/* Item Details */}
                    <div className="col-span-5 flex items-center gap-3 md:col-span-3">
                      <label>
                        <input
                          type="checkbox"
                          checked={item.isSelected}
                          onChange={(e) => handleSelectItem(e, item.id)}
                          className="h-[20px] w-[20px]"
                        />
                      </label>
                      <img
                        src={item.imgUrl}
                        alt="Product"
                        className="h-[80px] w-[80px]"
                      />
                      <a
                        href="#"
                        className="line-clamp-2 flex-1 text-sm hover:text-primary"
                      >
                        {item.name}
                      </a>
                    </div>
                    <div className="col-span-1 hidden md:block">
                      {item.price.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="md:justify-startst col-span-2 flex justify-end md:col-span-1 md:justify-start">
                      <div className="flex gap-1">
                        <button className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-gray-500">
                          <HiMinusSmall />
                        </button>
                        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-gray-500 text-sm">
                          {item.quantity}
                        </span>
                        <button className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-gray-500">
                          <HiPlusSmall />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-6 text-end font-semibold text-red-500 md:col-span-1 md:text-start">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </div>
                    <div className="col-span-1 flex justify-end md:justify-center">
                      <button className="hover:text-red-500">
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="md:w-[25%]">
              <div className="rounded-md bg-white p-4">
                <div className="flex flex-col gap-3 text-gray-500">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{totalPrice.toLocaleString("vie")}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>0đ</span>
                  </div>
                </div>

                <div className="my-4 h-[1px] w-full bg-gray-400"></div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Tổng tiền thanh toán</span>
                    <span className="text-xl font-bold text-red-500">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>

                  <div className="mt-8">
                    <button className="w-full rounded-md bg-red-500 py-2 text-white">
                      Mua hàng ({cartItems.filter((i) => i.isSelected).length})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
