import React, { useState } from "react";
import ModalRating from "./ModalRating";

function FormReview({ product }) {
  const [contentReview, setContentReview] = useState("");
  const [openModalRating, setOpenModalRating] = useState(false);

  return (
    <div>
      <form
        className="relative mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          setOpenModalRating(true);
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

      {/* Modal */}
      <ModalRating
        openModalRating={openModalRating}
        setOpenModalRating={setOpenModalRating}
        contentReview={contentReview}
        setContentReview={setContentReview}
        product={product}
      />
    </div>
  );
}

export default FormReview;
