import ReviewProductStarSkeleton from "@/components/Skeleton/ReviewProductStarSkeleton";
import { getReviewsStar } from "@/services/reviewService";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";

function ReviewProductStar({ productName }) {
  const [reviewsStar, setReviewsStar] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsStar((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const { data } = await getReviewsStar(productId);
        setReviewsStar({
          data: data,
          isLoading: false,
          hasError: false,
        });
      } catch (error) {
        console.error(error);
        setReviewsStar((prevState) => ({ ...prevState, hasError: true }));
      } finally {
        setReviewsStar((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchReviews();
  }, []);

  if (reviewsStar.isLoading || reviewsStar.hasError)
    return <ReviewProductStarSkeleton />;

  return (
    <div>
      <h2 className="font-semibold">{productName}</h2>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <FaStar className="text-xl text-yellow-400" />
          <div>
            <span className="text-5xl font-bold">
              {Math.round(reviewsStar.data.averageRating * 10) / 10}
            </span>
            /<span>5</span>
          </div>
        </div>
        <div className="mt-2">
          <span>{reviewsStar.data.totalReview} Đánh giá</span>
        </div>
      </div>
      <div className="">
        {[5, 4, 3, 2, 1].map((num, index) => (
          <div key={index} className="mt-4 flex items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              {num}
              <FaStar className="text-yellow-400" />
            </div>
            <div className="mx-4 h-3 w-full flex-1 rounded bg-gray-200">
              <div
                style={{
                  width:
                    reviewsStar.data.totalReview !== 0
                      ? `${Math.round((reviewsStar.data.ratingsBreakdown[num] / reviewsStar.data.totalReview) * 100)}%`
                      : "0%",
                }}
                className={clsx(`h-3 rounded bg-yellow-300`)}
              ></div>
            </div>
            <div className="w-9">
              <span className="text-sm font-medium text-gray-500">
                {reviewsStar.data.totalReview !== 0
                  ? Math.round(
                      (reviewsStar.data.ratingsBreakdown[num] /
                        reviewsStar.data.totalReview) *
                        100,
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewProductStar;
