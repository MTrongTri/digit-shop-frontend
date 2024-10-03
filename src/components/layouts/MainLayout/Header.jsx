import { Link, useNavigate } from "react-router-dom";
import { images } from "@/constants";
import NavBar from "@/components/layouts/MainLayout/NavBar";
import Search from "@/components/layouts/MainLayout/Search";
import Cart from "@/components/layouts/MainLayout/Cart";

import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Container from "@/components/Container";

function Header() {
  const navigate = useNavigate();
  const isLogedIn = false;

  return (
    <header className="h-header w-full bg-[#fff] py-2 font-roboto">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
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
            {!isLogedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg bg-primary px-6 py-2 text-[#fff]"
              >
                Đăng nhập
              </button>
            ) : (
              <>
                <img
                  src={images.Logo}
                  alt=""
                  className="h-[48px] w-[48px] rounded-full"
                />
                <ul className="absolute -right-0 top-full hidden min-w-[200px] flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] group-hover:flex">
                  <li className="px-3 py-2 hover:bg-gray-100">
                    <Link to="/info" className="flex items-center gap-2">
                      <FaUser className="size-4" />
                      <span>Thông tin</span>
                    </Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-100">
                    <Link to="/info" className="flex items-center gap-2">
                      <IoSettingsSharp className="size-4" />
                      <span>Cài đặt</span>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        {/* Navbar */}
        <NavBar />
      </Container>
    </header>
  );
}

export default Header;
