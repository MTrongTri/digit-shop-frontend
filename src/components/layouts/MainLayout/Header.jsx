import Cart from "@/components/layouts/MainLayout/Cart";
import NavBar from "@/components/layouts/MainLayout/NavBar";
import Search from "@/components/layouts/MainLayout/Search";
import { images } from "@/constants";
import { Link, useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { IoLogOut, IoSettingsSharp } from "react-icons/io5";

import Container from "@/components/Container";
import { logout } from "@/services/authService";
import { getAllUser } from "@/services/userService";
import { setUser } from "@/stores/userSlice";
import { removeInfoLogout } from "@/utils/localStorage";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaClipboardList } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const userState = useSelector((state) => state.user.userInfo);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await logout({ accessToken, refreshToken });
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      navigate("/login");
    } finally {
      removeInfoLogout();
      userDispatch(setUser(null));
    }
  };

  return (
    <header className="h-fit w-full bg-[#fff] py-2 font-roboto">
      <Container>
        <div className="flex items-center justify-between px-4">
          <div>
            <Link to="/">
              <img
                className="h-[48px] w-[48px] rounded-full"
                src={images.Logo}
                alt="logo"
              />
            </Link>
          </div>

          {/* Search */}
          <Search></Search>

          {/* Cart */}
          <Cart></Cart>

          <div className="group relative">
            {!userState ? (
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg bg-primary px-6 py-2 text-[#fff] hover:opacity-80"
              >
                Đăng nhập
              </button>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span>{userState.fullname}</span>
                  <img
                    src={
                      userState.avatar ? userState.avatar : images.AvatarDefault
                    }
                    alt=""
                    className="h-[48px] w-[48px] rounded-full"
                  />
                </div>
                <ul className="absolute -right-0 top-full z-10 hidden min-w-[200px] flex-col bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] group-hover:flex">
                  <li className="px-3 py-2 hover:bg-gray-100">
                    <Link
                      to="/user/my-account"
                      className="flex items-center gap-2"
                    >
                      <FaUser className="text-[16px]" />
                      <span>Thông tin</span>
                    </Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-100">
                    <Link to="/user/orders" className="flex items-center gap-2">
                      <FaClipboardList className="text-[16px]" />
                      <span>Đơn mua</span>
                    </Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-100">
                    <button
                      className="flex w-full items-center gap-2"
                      onClick={handleLogout}
                    >
                      <IoLogOut className="text-[16px]" />
                      <span>Đăng xuất</span>
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        {/* Navbar */}
        {/* <NavBar /> */}
      </Container>
    </header>
  );
}

export default Header;
