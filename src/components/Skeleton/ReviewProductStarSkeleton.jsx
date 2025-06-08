import React from "react";
import { FaStar } from "react-icons/fa6";

function ReviewProductStarSkeleton() {
  return (
    <div>
      <h2 className="skeleton h-[20px] font-semibold"></h2>
      <div className="flex flex-col">
        <div className="mt-2 flex items-center gap-2">
          <span className="skeleton h-[40px] w-[80px]"></span>
        </div>
        <div className="mt-2">
          <span className="skeleton block h-[20px] w-[90px]"></span>
        </div>
      </div>
      <div className="">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mt-4 flex items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div>
                <span className="skeleton block h-4 w-4"></span>
              </div>
              <div>
                <span className="skeleton block h-4 w-4"></span>
              </div>
            </div>
            <div className="mx-4 h-3 w-full rounded bg-gray-200 dark:bg-gray-700">
              <div className="skeleton h-3 rounded"></div>
            </div>
            <span className="skeleton h-4 w-4"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewProductStarSkeleton;
