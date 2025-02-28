import Comment from "@/components/Comment/Comment";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Pagination from "@/components/Pagination";
import CommentSkeleton from "@/components/Skeleton/CommentSkeleton";
import { getReviewsPage } from "@/services/reviewService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReviewCommentSection({ reloadComment, setReloadComment }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviews, setReviews] = useState({
    data: [],
    totalPage: 0,
    isLoading: true,
    hasError: false,
  });

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setReviews((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const { data } = await getReviewsPage(currentPage, 4, productId);
        setReviews({
          data: data.items.productReviews,
          totalPage: data.totalPage,
          isLoading: false,
          hasError: false,
        });
      } catch (error) {
        console.error(error);
        setReviews((prevState) => ({ ...prevState, hasError: true }));
      } finally {
        setReviews((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchReviews();
  }, [currentPage, reloadComment]);

  if (reviews.isLoading)
    return (
      <div className="flex flex-col gap-10">
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    );

  if (reviews.hasError)
    return (
      <ErrorMessage message="Có lỗi trong quá trình tải đánh giá, vui lòng thử lại hoặc liên hệ quản trị viên để được hổ trợ" />
    );

  if (reviews.data.length === 0)
    return (
      <div className="flex">
        <span className="mx-auto text-gray-500">
          Chưa có đánh giá nào cho sản phẩm này.
        </span>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-10">
        {reviews.data.map((data) => (
          <Comment
            key={data.id}
            data={data}
            setReloadComment={setReloadComment}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          totalPage={reviews.totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ReviewCommentSection;
