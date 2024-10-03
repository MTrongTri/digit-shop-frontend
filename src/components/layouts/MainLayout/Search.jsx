import Popup from "@/components/Popup/Popup";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

function Search() {
  const [keySearch, setKeySearch] = useState("");

  return (
    <div className="relative flex-1 md:flex-grow-0">
      <form className="hidden md:block">
        <input
          onChange={(e) => setKeySearch(e.target.value)}
          className="w-[280px] rounded-full border border-[#DDDDE3] px-4 py-2 pr-12 font-roboto text-sm outline-none focus:border-primary md:w-[400px]"
          type="text"
          placeholder="Tìm kiếm"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary"
        >
          <IoIosSearch className="size-6" />
        </button>
      </form>
      <div className="ml-8 flex items-center md:hidden">
        <button className="hover:text-primary">
          <IoIosSearch className="size-6" />
        </button>
      </div>
      {keySearch !== "" && <Popup></Popup>}
    </div>
  );
}

export default Search;
