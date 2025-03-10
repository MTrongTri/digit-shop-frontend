import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { countCartItem } from "@/services/cartService";
import { countCartItemFetch } from "@/stores/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { totalItem } = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userState) {
      dispatch(countCartItemFetch());
    }
  }, []);

  return (
    <div className="relative mr-8">
      <div>
        <Link to={"/cart"} className="hover:text-primary">
          <FaCartShopping className="size-6" />
          <span className="absolute -right-[10px] -top-[10px] rounded-md bg-[#FF424F] px-[3px] text-sm text-white">
            {totalItem}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
