import Popup from "@/components/Popup/Popup";
import useDebounce from "@/hooks/useDebounce";
import { getProductPaginate } from "@/services/productService";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

function Search() {
  const [keySearch, setKeySearch] = useState("");
  const keySearchDebouce = useDebounce(keySearch, 500);

  const [productData, setProductData] = useState({
    products: [],
    loading: false,
    hasError: false,
  });

  useEffect(() => {
    const fetchProductsData = async () => {
      setProductData((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getProductPaginate({
          currentPage: 0,
          pageSize: 4,
          keySearch: keySearchDebouce,
        });

        setProductData((prevState) => ({ ...prevState, products: data.items }));
      } catch (error) {
        setProductData((prevState) => ({
          ...prevState,
          hasError: true,
          loading: false,
        }));
      } finally {
        setProductData((prevState) => ({ ...prevState, loading: false }));
      }
    };

    if (keySearchDebouce) {
      fetchProductsData();
    }
  }, [keySearchDebouce]);

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
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
        >
          <IoIosSearch className="size-6" />
        </button>
      </form>
      {/* <div className="ml-8 flex items-center md:hidden">
        <button className="hover:text-primary">
          <IoIosSearch className="size-6" />
        </button>
      </div> */}
      {productData.hasError && (
        <div
          className={`absolute left-0 right-0 top-full z-10 flex flex-col gap-3 rounded-md bg-white p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]`}
        >
          <div className="flex">
            <span className="m-auto p-4 text-red-500">Có lỗi xảy ra</span>
          </div>
        </div>
      )}

      {productData.loading && (
        <div
          className={`absolute left-0 right-0 top-full z-10 flex flex-col gap-3 rounded-md bg-white p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]`}
        >
          <div className="flex">
            <span className="loading loading-spinner loading-md m-auto p-4"></span>
          </div>
        </div>
      )}

      {productData.products.length !== 0 && keySearchDebouce && (
        <Popup data={productData.products}></Popup>
      )}
    </div>
  );
}

export default Search;
