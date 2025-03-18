import { images } from "@/constants";
import React from "react";
import { useSelector } from "react-redux";
import { FaRegEdit, FaBell, FaUser, FaClipboardList } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

function UserSideBar() {
  const userState = useSelector((state) => state.user.userInfo);
  const { pathname } = useLocation();

  return (
    <div className="rounded-md bg-white p-4">
      {/* header */}
      <div>
        <div className="flex items-center gap-2">
          <div>
            <img
              src={userState.avatar ? userState.avatar : images.AvatarDefault}
              alt="avatar user"
              className="h-[60px] w-[60px]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold"> {userState.fullName}</span>
            <button className="flex items-center gap-2 hover:text-primary">
              <FaRegEdit />
              <span>Chỉnh sửa hồ sơ</span>
            </button>
          </div>
        </div>
      </div>

      {/* items */}
      <div className="mt-6">
        <ul>
          <li
            className={clsx(
              "group rounded-md px-2 py-3 hover:bg-primary/20",
              pathname === "/user/my-account" && "bg-primary/20 text-primary",
            )}
          >
            <Link className="flex items-center gap-1 group-hover:text-primary">
              <FaBell className="text-[24px]" />
              Tài khoản của tôi
            </Link>
          </li>
          <li
            className={clsx(
              "group rounded-md px-2 py-3 hover:bg-primary/20",
              pathname === "/user/notify" && "bg-primary/20 text-primary",
            )}
          >
            <Link className="flex items-center gap-1 group-hover:text-primary">
              <FaUser className="text-[24px]" />
              Thông báo
            </Link>
          </li>
          <li
            className={clsx(
              "group rounded-md px-2 py-3 hover:bg-primary/20",
              pathname === "/user/orders" && "bg-primary/20 text-primary",
            )}
          >
            <Link className="flex items-center gap-1 group-hover:text-primary">
              <FaClipboardList className="text-[24px]" />
              Đơn mua
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserSideBar;
