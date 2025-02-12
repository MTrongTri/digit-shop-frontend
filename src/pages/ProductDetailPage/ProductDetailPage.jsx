import Container from "@/components/Container";
import ThumbsGallerySlider from "@/components/Slider/ThumbsGallerySlider";
import { useState } from "react";
import { HiOutlineMinusSmall, HiOutlinePlusSmall } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import Pagination from "@/components/Pagination";
import ModalRating from "./ModalRating";
import ModalPurchase from "./ModalPurchase";

function ProductDetailPage() {
  const [quantityBuy, setQuantityBuy] = useState(1);
  const [currentPage, setCrrentPage] = useState(0);
  const [openModalRating, setOpenModalating] = useState(false);
  const [contentReview, setContentReview] = useState("");

  return (
    <Container>
      <div className="mt-8 min-h-[540px]">
        <div className="bg-white p-4 md:p-6">
          <div className="flex flex-col gap-4 rounded-md md:flex-row md:gap-10">
            {/* Thumb gallery section */}
            <div className="md:w-[30%]">
              <ThumbsGallerySlider />
            </div>

            {/* Info product section */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Diện thoại xiaomi</h2>
              </div>
              <div className="font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <span>5</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                  </div>
                  <span>(100)</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-red-500">
                  {Number(18000000).toLocaleString("vie")}đ
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

              <div className="mt-8 flex gap-4">
                <button className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80">
                  Mua ngay
                </button>
                <button className="rounded-md border border-primary bg-white px-4 py-2 text-primary hover:opacity-80">
                  Thêm vào giỏ hàng
                </button>
              </div>

              <div className="mt-6 hidden md:block">
                <h2 className="text-xl font-semibold">Mô tả sản phẩm</h2>
                <p className="h-[200px]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nesciunt at rem accusantium sed similique reiciendis, amet
                  eos. Rerum dolorum assumenda eveniet magni perferendis totam,
                  eum mollitia ullam quam officia, dolores aut suscipit libero
                  animi sequi beatae inventore repellat quasi neque aspernatur
                  amet dignissimos non tenetur! Dolorem, veritatis facilis cum
                  hic, quae ex magni eius pariatur iusto soluta unde fugit
                  commodi, provident harum similique illo voluptas. Minus harum
                  ex architecto aliquam non, deleniti asperiores distinctio,
                  repellat tempora nihil voluptatum quibusdam sed consequatur.
                  Deserunt exercitationem, quis maxime perspiciatis officiis
                  fuga ipsam repellendus ex velit labore numquam assumenda magni
                  unde tempora doloremque et.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* reting section */}
        <div className="mt-4 rounded-md bg-white p-8">
          <div className="hidden md:block">
            <span className="text-xl font-bold">Viết đánh giá</span>
          </div>
          <div className="col-span-10 mt-3 grid grid-flow-row gap-10 md:grid-flow-col">
            <div className="order-2 col-span-10 md:order-1 md:col-span-6">
              <form
                className="relative mb-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpenModalating(true);
                }}
              >
                <div className="mb-4 rounded-lg rounded-t-lg border border-gray-400 bg-white px-4 py-2">
                  <textarea
                    id="comment"
                    rows="6"
                    className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    placeholder="Viết đánh giá tại đây..."
                    required
                    onChange={(e) => setContentReview(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="absolute bottom-[10px] right-[40px] inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-center text-xs font-medium text-white hover:opacity-80 focus:ring-4"
                >
                  Đăng
                </button>
              </form>

              <div className="flex flex-col gap-10">
                <div>
                  <div className="flex items-center">
                    <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                      <img
                        className="mr-2 h-[40px] w-[40px] rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate="true"
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>

                  <div className="ml-[48px] flex gap-1">
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                  </div>

                  <div>
                    <p className="ml-[48px] text-gray-500 dark:text-gray-400">
                      Very straight-to-point article. Really worth time reading.
                      Thank you! But tools are just the instruments for the UX
                      designers. The knowledge of the design tools are as
                      important as the creation of the design strategy.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                      <img
                        className="mr-2 h-[40px] w-[40px] rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate="true"
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p>
                  </div>

                  <div className="ml-[48px] flex gap-1">
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                    <FaStar className="text-sm text-yellow-400" />
                  </div>

                  <div>
                    <p className="ml-[48px] text-gray-500 dark:text-gray-400">
                      Very straight-to-point article. Really worth time reading.
                      Thank you! But tools are just the instruments for the UX
                      designers. The knowledge of the design tools are as
                      important as the creation of the design strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPage={1}
                  setCurrentPage={setCrrentPage}
                />
              </div>
            </div>

            <div className="order-1 col-span-10 flex flex-col gap-4 rounded-md bg-white md:order-2 md:col-span-4">
              <h2 className="font-semibold">
                Đánh giá Điện thoại realme 13 5G 8GB/256GB
              </h2>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <FaStar className="text-xl text-yellow-400" />
                  <div>
                    <span className="text-5xl font-bold">4.9</span>/
                    <span>5</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span>100 đánh giá</span>
                </div>
              </div>
              <div className="">
                <div className="mt-4 flex items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    5
                    <FaStar className="text-yellow-400" />
                  </div>
                  <div className="mx-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700">
                    <div className="h-3 w-[10%] rounded bg-yellow-300"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    70%
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    4
                    <FaStar className="text-yellow-400" />
                  </div>
                  <div className="mx-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700">
                    <div className="h-3 w-[10%] rounded bg-yellow-300"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    70%
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    3
                    <FaStar className="text-yellow-400" />
                  </div>
                  <div className="mx-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700">
                    <div className="h-3 w-[10%] rounded bg-yellow-300"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    70%
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    2
                    <FaStar className="text-yellow-400" />
                  </div>
                  <div className="mx-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700">
                    <div className="h-3 w-[10%] rounded bg-yellow-300"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    70%
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    1
                    <FaStar className="text-yellow-400" />
                  </div>
                  <div className="mx-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700">
                    <div className="h-3 w-[10%] rounded bg-yellow-300"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    70%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalRating
        openModalRating={openModalRating}
        setOpenModalRating={setOpenModalating}
        contentReview={contentReview}
      />

      <ModalPurchase />
    </Container>
  );
}

export default ProductDetailPage;
