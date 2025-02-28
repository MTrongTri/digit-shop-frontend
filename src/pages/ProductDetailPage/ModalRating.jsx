import ModalContainer from "@/components/Modal/ModalContainer";
import { createReview } from "@/services/reviewService";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

function ModalRating({
  openModalRating,
  setOpenModalRating,
  contentReview,
  productData,
  setReloadComment,
}) {
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { productId: productData.Id, rating, comment: contentReview };
    try {
      const res = await createReview(data);
      if (res.statusCode >= 100 && res.statusCode < 400) {
        setOpenModalRating(false);
        setReloadComment((prevState) => !prevState);
        document
          .getElementById("comment-section")
          .scrollIntoView({ behavior: "smooth", block: "start" });
        toast.success("Đã đánh giá sản phẩm");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra xin vui lòng thử lại");
    }
  };

  if (!openModalRating) return;

  return (
    <ModalContainer>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-[680px] flex-col gap-5 rounded-lg bg-white p-6">
          <div className="relative">
            <p className="text-center font-bold">Đánh giá sản phẩm</p>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
              onClick={() => setOpenModalRating(false)}
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <div className="h-[1px] w-full bg-slate-200"></div>

          <div className="flex flex-col gap-8">
            <img
              src={productData.thumbnail.url}
              alt={productData.name}
              className="mx-auto h-[100px] w-[100px] object-contain"
            />
            <span className="mx-auto text-lg font-semibold">
              {productData.name}
            </span>
          </div>

          <div className="flex justify-center">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="rating flex gap-3">
                {Array.from({ length: 5 }).map((_, index) =>
                  index === 0 ? (
                    <input
                      key={index}
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 size-10 bg-orange-400"
                      defaultChecked
                      onChange={() => setRating(index + 1)}
                    />
                  ) : (
                    <input
                      key={index}
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 size-10 bg-orange-400"
                      onChange={() => setRating(index + 1)}
                    />
                  ),
                )}
              </div>

              <div className="mt-10">
                <button className="w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-80">
                  Gủi đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ModalRating;
