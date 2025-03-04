import { useEffect, useState } from "react";

import Categories from "@/components/Categories/Categories";
import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/Product/ProductCard";
import ProductContainer from "@/components/Product/ProductContainer";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import HomeSlider from "@/components/Slider/HomeSlider";
import { getProductPaginate } from "@/services/productService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [productData, setProductData] = useState({
    products: [],
    totalPage: 1,
    loading: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsData = async () => {
      setProductData((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getProductPaginate({
          currentPage,
        });

        setProductData({
          products: data.items,
          totalPage: data.totalPage,
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
      }
    };

    fetchProductsData();
  }, [currentPage]);

  return (
    <Container>
      <HomeSlider></HomeSlider>
      <Categories></Categories>

      <div className="mt-8 rounded-md bg-white p-5">
        <div className="mb-5">
          <p className="text-2xl font-bold">Gợi ý cho bạn</p>
        </div>

        {productData.loading ? (
          <ProductContainer>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ProductContainer>
        ) : (
          <ProductContainer>
            {productData.products.map((item) => (
              <ProductCard key={item.Id} data={item} />
            ))}
          </ProductContainer>
        )}

        <div className="mt-8 flex justify-center">
          <Pagination
            totalPage={productData.totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
