import { IoIosSearch } from "react-icons/io";

import { Link } from "react-router-dom";
import { images } from "@/constants";
import NavBar from "@/components/layouts/MainLayout/NavBar";

function Header() {
  return (
    <header className="font-roboto h-header w-full bg-[#fff] py-2">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
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

          <div className="relative flex-1 md:flex-grow-0">
            <div className="hidden md:block">
              <input
                className="font-roboto focus:border-primary w-[280px] rounded-full border border-[#DDDDE3] px-4 py-2 pr-12 text-sm outline-none md:w-[400px]"
                type="text"
                placeholder="Tìm kiếm"
              />
              <button className="hover:text-primary absolute right-4 top-1/2 -translate-y-1/2">
                <IoIosSearch className="size-6" />
              </button>
            </div>
            <div className="ml-8 flex items-center md:hidden">
              <button className="hover:text-primary">
                <IoIosSearch className="size-6" />
              </button>
            </div>
          </div>

          <div>
            <button className="bg-primary rounded-lg px-6 py-2 text-[#fff]">
              Đăng nhập
            </button>
          </div>
        </div>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;
