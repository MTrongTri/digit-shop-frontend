import Container from "@/components/Container";
import LoadingDotsFullScreen from "@/components/Loading/LoadingDotsFullScreen";
import ThumbsGallerySlider from "@/components/Slider/ThumbsGallerySlider";
import { addToCart } from "@/services/cartService";
import { getProductById } from "@/services/productService";
import { countCartItemFetch } from "@/stores/cartSlice";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FormReview from "./FormReview";
import ModalPurchase from "./ModalPurchase";
import ModalRating from "./ModalRating";
import ReviewProductStar from "./ReviewProductStar";
import ReviewCommentSection from "./ReviewCommentSection";

function ProductDetailPage() {
  const [quantityBuy, setQuantityBuy] = useState(1);
  const [contentReview, setContentReview] = useState("");
  const [openModalRating, setOpenModalRating] = useState(false);
  const [openModalPurchase, setOpenModalPurchase] = useState(false);
  const [productDataBuy, setProductDataBuy] = useState();
  const [reloadComment, setReloadComment] = useState(false);
  const [product, setProduct] = useState({
    data: [],
    loading: true,
    error: false,
  });

  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct((prevState) => ({ ...prevState, loading: true }));
      try {
        const { data } = await getProductById(productId);
        setProduct({
          data: data,
          loading: false,
          error: false,
        });
      } catch (error) {
        toast.error("Đã có lỗi xảy ra");
        setProduct((prevState) => ({ ...prevState, error: true }));
      } finally {
        setProduct((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
      const { statusCode } = await addToCart({
        productId,
        quantity: quantityBuy,
      });
      if (statusCode) {
        toast.success("Đã thêm 1 sản phẩm vào giỏ hàng");
        dispatch(countCartItemFetch());
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      console.error(error);
    }
  };

  const handleBuyProduct = () => {
    setOpenModalPurchase(true);
    setProductDataBuy({
      product: product.data,
      quantity: quantityBuy,
    });
  };

  if (product.loading || product.error) return <LoadingDotsFullScreen />;

  return (
    <Container>
      <div className="mt-8 min-h-[540px]">
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-col gap-4 rounded-md md:flex-row md:gap-10">
            {/* Thumb gallery section */}
            <div className="md:w-[30%]">
              <ThumbsGallerySlider
                images={[product.data.thumbnail, ...product.data.images]}
              />
            </div>

            {/* Info product section */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">{product.data.name}</h2>
              </div>
              <div className="font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <span>
                    {Math.round(product.data.averageRating * 10) / 10}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={clsx(
                          "text-sm",
                          index < Math.round(product.data.averageRating) &&
                            "text-yellow-400",
                        )}
                      />
                    ))}
                  </div>
                  <span>({product.data.totalReview})</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-red-500">
                  {product.data.price.toLocaleString("vie")}đ
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="rounded-sm border border-gray-400 px-2"
                  onClick={() =>
                    setQuantityBuy((prevState) =>
                      prevState > 1 ? prevState - 1 : prevState,
                    )
                  }
                >
                  <HiOutlineMinusSmall />
                </button>
                <div className="flex size-9 rounded-sm border border-gray-400 text-center text-gray-600">
                  <span className="m-auto">{quantityBuy}</span>
                </div>
                <button
                  className="rounded-sm border border-gray-400 px-2"
                  onClick={() => setQuantityBuy((prevState) => prevState + 1)}
                >
                  <HiOutlinePlusSmall />
                </button>
              </div>

              <div className="mt-4">
                <p>Trong kho: {product.data.stockQuantity}</p>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
                  onClick={() => handleBuyProduct()}
                >
                  Mua ngay
                </button>
                <button
                  className={clsx(
                    "rounded-md border border-primary bg-white px-4 py-2 text-primary hover:opacity-80",
                  )}
                  onClick={() => handleAddToCart()}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* reting section */}
        <div className="mt-4 rounded-md bg-white p-8">
          <div className="hidden md:block">
            <span className="text-xl font-bold">Viết đánh giá</span>
          </div>
          <div className="mt-3 grid gap-10 md:grid-cols-3">
            <div className="order-2 md:order-1 md:col-span-2">
              <div>
                <FormReview
                  setContentReview={setContentReview}
                  setOpenModalRating={setOpenModalRating}
                />
              </div>

              <div id="comment-section">
                <ReviewCommentSection
                  reloadComment={reloadComment}
                  setReloadComment={setReloadComment}
                />
              </div>
            </div>

            <div className="order-1 flex flex-col gap-4 rounded-md bg-white md:order-2 md:col-span-1">
              <ReviewProductStar productName={product.data.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalRating
        openModalRating={openModalRating}
        setOpenModalRating={setOpenModalRating}
        contentReview={contentReview}
        productData={product.data}
        setReloadComment={setReloadComment}
      />

      <ModalPurchase
        openModal={openModalPurchase}
        setOpenModal={setOpenModalPurchase}
        productDatas={[productDataBuy]}
      />
    </Container>
  );
}

export default ProductDetailPage;
