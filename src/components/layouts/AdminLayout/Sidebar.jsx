import { FaCircle } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { TbBrandAppleFilled } from "react-icons/tb";

const MENU_ITEMS = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Sản phẩm",
    to: "/admin/products",
    icon: <AiFillProduct />,
  },
  {
    name: "Danh mục sản phẩm",
    to: "/admin/categories",
    icon: <MdCategory />,
  },
  {
    name: "Thương hiệu",
    to: "/admin/brands",
    icon: <TbBrandAppleFilled />,
  },
];

function Sidebar() {
  const path = useLocation();

  return (
    <div className="h-full bg-white p-8">
      <div>
        <div className="flex font-roboto text-2xl font-bold">
          <h2>Digit Shop</h2>
          <span className="text-[#00B074]">
            <FaCircle className="size-2" />
          </span>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-400">Admin Dashboard</span>
        </div>

        <div className="mt-8">
          <ul>
            {MENU_ITEMS.map((item) => (
              <li
                className={clsx(
                  "rounded-md duration-300 hover:bg-[#00B074]/20 hover:text-[#00B074]",
                  {
                    "bg-[#00B074]/20 font-semibold text-[#00B074]":
                      item.to === path.pathname ||
                      (path.pathname === "/admin" &&
                        item.to === "/admin/dashboard"),
                  },
                )}
                key={item.name}
              >
                <Link
                  to={`${item.to}`}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
