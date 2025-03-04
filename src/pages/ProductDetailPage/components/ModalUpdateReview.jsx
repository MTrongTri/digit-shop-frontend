import React, { useState } from "react";
import ModalContainer from "@/components/Modal/ModalContainer";
import { IoMdClose } from "react-icons/io";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import { updateReview } from "@/services/reviewService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/stores/loadingSlice";
import { fetchReviews } from "@/stores/reviewSlice";
import { useParams } from "react-router-dom";

function ModalUpdateReview({ id, comment, rating, isOpen, setIsOpen }) {
  const [newComment, setNewComment] = useState(comment);
  const [newRating, setNewRating] = useState(rating);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const { currentPage } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const onConfirm = async () => {
    if (!newComment || (newComment === comment && rating === newRating)) return;
    try {
      dispatch(showLoading());
      await updateReview({ id, comment: newComment, rating: newRating });

      dispatch(
        fetchReviews({
          pageNo: currentPage,
          pageSize: 4,
          productId: productId,
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      dispatch(hideLoading());
      setOpenModalConfirm(false);
    }
  };

  return (
    <ModalContainer>
      <div className="m-auto h-fit w-[800px] rounded-md bg-white p-6 shadow-[0_0px_10px_rgb(0,0,0,0.2)]">
        <div>
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-2">
            <span className="font-semibold">Chỉnh sửa đánh giá</span>
            <button
              className="hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose className="text-[30px]" />
            </button>
          </div>

          <div className="mt-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-3">
                <div className="mb-4 rounded-lg rounded-t-lg border border-gray-400 bg-white px-4 py-2">
                  <textarea
                    id="comment"
                    rows="6"
                    className="border-1 w-full border-gray-400 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <span className="font-semibold">Đánh giá</span>
                </div>
                <div className="rating rating-lg">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      aria-label="1 star"
                      defaultChecked={index == rating - 1}
                      onChange={() => setNewRating(index + 1)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="float-right rounded-md bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                  disabled={
                    !newComment ||
                    (newComment === comment && rating === newRating)
                  }
                  onClick={() => setOpenModalConfirm(true)}
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalConfirm
        isShow={openModalConfirm}
        setIsShow={setOpenModalConfirm}
        heading="Cập nhật đánh giá"
        message="Bạn có chắc muốn cập nhật đánh giá này không?"
        onConfirm={onConfirm}
      />
    </ModalContainer>
  );
}

export default ModalUpdateReview;
