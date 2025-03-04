import Comment from "@/components/Comment/Comment";
import ErrorMessage from "@/components/Error/ErrorMessage";
import Pagination from "@/components/Pagination";
import CommentSkeleton from "@/components/Skeleton/CommentSkeleton";
import { fetchReviews, setCurrentPage } from "@/stores/reviewSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ReviewCommentSection({ productId }) {
  const {
    items: reviews,
    currentPage,
    totalPage,
    isLoading,
    error,
  } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchReviews({ pageNo: currentPage, pageSize: 4, productId: productId }),
    );
  }, [dispatch, currentPage]);

  const handleChangePage = (selected) => {
    dispatch(setCurrentPage(selected));
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-10">
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    );

  if (error)
    return (
      <ErrorMessage message="Có lỗi trong quá trình tải đánh giá, vui lòng thử lại hoặc liên hệ quản trị viên để được hổ trợ" />
    );

  if (reviews.length === 0)
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
        {reviews.map((data) => (
          <Comment key={data.id} data={data} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ReviewCommentSection;
