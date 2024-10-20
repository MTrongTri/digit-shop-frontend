/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa6";

function ProductCard({ data }) {
  return (
    <div className="h-[360px] duration-300 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_0px_4px]">
      <Link
        className="block h-full rounded-[4px] border border-gray-200"
        to={`/products/${data.id}`}
      >
        <div className="mt-3 aspect-square w-full p-1">
          <img className="duration-300 hover:-mt-2" src={data.imgUrl} alt="" />
        </div>

        <div className="flex flex-col gap-2 p-2">
          <div>
            <span className="line-clamp-2 h-[46px] font-medium">
              {data.name}
            </span>
          </div>
          <div>
            <span className="text-lg font-semibold text-[#ff424e]">
              {data.price.toLocaleString("Vi")}đ
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaStar className="text-[#ffc400]" />
            <span>4 (100)</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
