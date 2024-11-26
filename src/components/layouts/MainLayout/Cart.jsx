import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

function Cart() {
  return (
    <div className="relative mr-8">
      <div>
        <Link to={"/cart"} className="hover:text-primary">
          <FaCartShopping className="size-6" />
          <span className="absolute -right-[10px] -top-[10px] rounded-md bg-[#FF424F] px-[3px] text-sm text-white">
            0
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
