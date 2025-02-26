import { useEffect, useState } from "react";

import { getAllCategory } from "@/services/categoryService";
import { Link } from "react-router-dom";
import CategorySkeleton from "@/components/Skeleton/CategorySkeleton";

function Categories() {
  const [categoriesData, setCategoriesData] = useState({
    categories: [],
    loading: false,
  });

  useEffect(() => {
    const fetchCateData = async () => {
      setCategoriesData((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getAllCategory();
        setCategoriesData({
          categories: data,
          loading: false,
        });
      } catch (error) {
        if (
          (error.request && !error.response) ||
          error.response?.status === 500
        ) {
          navigate("/server-error");
        } else {
          toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
        }
      } finally {
        setCategoriesData((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchCateData();
  }, []);

  return (
    <div className="mt-8 rounded-md bg-white p-4">
      {categoriesData.loading ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {categoriesData.categories.map((item, index) => (
            <li
              key={index}
              className="p-4 text-white duration-[400ms] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:h-[221px]"
            >
              <Link to="/">
                <div>
                  <img
                    className="aspect-square w-full object-contain p-3"
                    src={item.imgUrl}
                    alt="img category"
                  />
                  <p>
                    <span className="mt-2 line-clamp-2 h-[40px] w-full text-center text-sm text-black">
                      {item.name}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;
