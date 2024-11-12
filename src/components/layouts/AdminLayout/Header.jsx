import { images } from "@/constants";
import { Link } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";

const MENU_ITEMS = [
  {
    name: "notify",
    to: "/",
    badge: 10,
    color: "#2D9CDB",
    Icon: FaBell,
  },
  {
    name: "message",
    to: "/",
    badge: 10,
    color: "#2D9CDB",
    Icon: AiOutlineMessage,
  },
  {
    name: "setting",
    to: "/",
    color: "#FF5B5B",
    Icon: IoMdSettings,
  },
];

function Header() {
  return (
    <div className="grid grid-flow-col gap-6">
      <div className="relative col-span-6">
        <form>
          <input
            type="text"
            className="w-full border-gray-600 px-4 py-2 text-sm outline-none"
            placeholder="Tìm kiếm"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <CiSearch />
          </button>
        </form>
      </div>

      <div className="col-span-4 ms-5 flex gap-10">
        {MENU_ITEMS.map(({ name, to, badge, color, Icon }) => (
          <div className="relative" key={name}>
            <Link
              to={to}
              className={`flex size-10 items-center justify-center rounded-lg`}
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="size-6" style={{ color }} />
            </Link>
            {badge && (
              <span
                className="absolute -right-5 -top-2 flex size-8 items-center justify-center rounded-full border-[4px] border-white text-xs text-white"
                style={{ backgroundColor: color }}
              >
                {badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="col-span-2 flex gap-2">
        <span className="h-full w-[2px] bg-gray-300"></span>
        <div className="flex flex-1 items-center justify-end gap-2">
          <span>Admin</span>
          <img src={images.AvatarDefault} alt="Avatar" className="size-10" />
        </div>
      </div>
    </div>
  );
}

export default Header;
