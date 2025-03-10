import Container from "@/components/Container";
import LoadingDotsFullScreen from "@/components/Loading/LoadingDotsFullScreen";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { images } from "@/constants";
import {
  deleteCartItemsByProductIds,
  getCartItems,
  updateQuantityCartItem,
} from "@/services/cartService";
import { countCartItemFetch } from "@/stores/cartSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMinusSmall, HiPlusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ModalPurchase from "../ProductDetailPage/components/ModalPurchase";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [reloadCartItems, setReloadCartItems] = useState(false);
  const [openModalDeleteCartItem, setOpenModalDeleteCartItem] = useState(false);
  const [itemSelectedIds, setItemSelectedIds] = useState([]);
  const dispatch = useDispatch();
  const [openModalPurchase, setOpenModalPurchase] = useState(false);

  const totalPrice = cartItems?.reduce(
    (total, item) =>
      itemSelectedIds.includes(item.productId)
        ? total + item.price * item.quantity
        : total,
    0,
  );

  const productBuys = cartItems.filter((item) =>
    new Set(itemSelectedIds).has(item.productId),
  );

  useEffect(() => {
    const fetchCartItems = async () => {
      setCartLoading(true);
      try {
        const { statusCode, data } = await getCartItems();
        if (statusCode === 201) {
          setCartItems(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Đã có lỗi xảy ra");
        setCartLoading(true);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCartItems();
  }, [reloadCartItems]);

  const toggleItemSelectionAll = (event) => {
    setItemSelectedIds(
      event.target.checked ? cartItems.map((item) => item.productId) : [],
    );
  };

  const toggleItemSelection = (event, productId) => {
    if (event.target.checked) {
      setItemSelectedIds((prevState) => [...prevState, productId]);
    } else {
      setItemSelectedIds((prevState) =>
        prevState.filter((id) => id != productId),
      );
    }
  };

  const handleUpdateQuantity = async (productId, quantityChange = 0) => {
    const currQuantity = cartItems.find(
      (item) => item.productId === productId,
    ).quantity;

    try {
      await updateQuantityCartItem({
        productId,
        quantity: currQuantity + quantityChange,
      });
      setReloadCartItems((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleOpenModalDeleteCartItems = () => {
    if (!itemSelectedIds.length) {
      toast.error("Vui lòng chọn sản phẩm cần xóa");
      return;
    }
    setOpenModalDeleteCartItem(true);
  };

  const handleConfirmDeleteCartItem = async () => {
    try {
      const res = await deleteCartItemsByProductIds(itemSelectedIds);
      if (res.statusCode === 201) {
        toast.success("Xóa thành công");
        dispatch(countCartItemFetch());
        setReloadCartItems((prevState) => !prevState);
        setItemSelectedIds([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setOpenModalDeleteCartItem(false);
    }
  };

  if (cartLoading) return <LoadingDotsFullScreen />;

  if (cartItems?.length === 0)
    return (
      <Container>
        <div className="mt-4 bg-white p-10">
          <div className="flex">
            <img src={images.EmptyCart} alt="" className="m-auto" />
          </div>
          <div>
            <p className="text-center font-semibold text-gray-600">
              Hiện chưa có sản phẩm nào trong giỏ hàng
            </p>
          </div>
        </div>
      </Container>
    );

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
                    checked={itemSelectedIds.length === cartItems?.length}
                    onChange={toggleItemSelectionAll}
                    className="h-[20px] w-[20px]"
                  />
                  <span>Tất cả</span>
                </label>
                <span className="col-span-1 hidden md:block">Đơn giá</span>
                <span className="col-span-1 hidden md:block">Số lượng</span>
                <span className="col-span-1 hidden md:block">Thành tiền</span>
                <div className="col-span-1 flex justify-center">
                  <button
                    className="hover:text-red-500"
                    onClick={handleOpenModalDeleteCartItems}
                  >
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="mt-3 flex max-h-[420px] flex-col gap-8 overflow-y-auto rounded-lg bg-white px-4 py-6">
                {cartItems?.map((item) => (
                  <div
                    key={item.productId}
                    className="grid grid-cols-7 items-center gap-2"
                  >
                    {/* Item Details */}
                    <div className="col-span-5 flex items-center gap-3 md:col-span-3">
                      <label>
                        <input
                          type="checkbox"
                          checked={itemSelectedIds.includes(item.productId)}
                          onChange={(e) =>
                            toggleItemSelection(e, item.productId)
                          }
                          className="h-[20px] w-[20px]"
                        />
                      </label>
                      <img
                        src={item.thumbnailUrl}
                        alt="Product"
                        className="h-[80px] w-[80px] object-contain"
                      />
                      <Link
                        to={`/products/${item.productId}`}
                        className="line-clamp-2 flex-1 text-sm hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="col-span-1 hidden text-gray-700 md:block">
                      {item.price.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="md:justify-startst col-span-2 flex justify-end md:col-span-1 md:justify-start">
                      <div className="flex gap-1">
                        <button
                          disabled={item.quantity === 1}
                          className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-gray-300 disabled:cursor-not-allowed"
                          onClick={() =>
                            handleUpdateQuantity(item.productId, -1)
                          }
                        >
                          <HiMinusSmall />
                        </button>
                        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-gray-300 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          className="flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-gray-300"
                          onClick={() =>
                            handleUpdateQuantity(item.productId, 1)
                          }
                        >
                          <HiPlusSmall />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-6 text-end font-semibold text-red-500 md:col-span-1 md:text-start">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </div>
                    <div className="col-span-1 flex justify-end md:justify-center">
                      <button
                        className="hover:text-red-500"
                        onClick={() => {
                          setOpenModalDeleteCartItem(true);
                          setItemSelectedIds([item.productId]);
                        }}
                      >
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
                    <span>
                      {totalPrice ? totalPrice.toLocaleString("vie") : 0}đ
                    </span>
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
                      {totalPrice ? totalPrice.toLocaleString("vie") : 0}đ
                    </span>
                  </div>

                  <div className="mt-8">
                    <button
                      disabled={itemSelectedIds.length == 0}
                      className="w-full rounded-md bg-red-500 py-2 text-white disabled:opacity-70"
                      onClick={() => setOpenModalPurchase(true)}
                    >
                      Mua hàng ({itemSelectedIds.length})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalConfirm
        heading="Xóa sản phẩm khỏi giỏ hàng"
        message="Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?"
        isShow={openModalDeleteCartItem}
        setIsShow={setOpenModalDeleteCartItem}
        onConfirm={handleConfirmDeleteCartItem}
      />
      <ModalPurchase
        openModal={openModalPurchase}
        setOpenModal={setOpenModalPurchase}
        products={productBuys}
      />
    </Container>
  );
}

export default CartPage;
