import { images } from "@/constants";
import clsx from "clsx";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaStar, FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ModalConfirm from "../Modal/ModalConfirm";
import { deleteReview } from "@/services/reviewService";
import toast from "react-hot-toast";

function Comment({ data, setReloadComment }) {
  const [openModalDeleteComment, setOpenModalDeleteComment] = useState(false);
  const [commentIdDelete, setCommentIdDelete] = useState(null);
  const userState = useSelector((state) => state.user.userInfo);

  const handleConfirm = async () => {
    if (!commentIdDelete) return;
    try {
      await deleteReview(commentIdDelete);

      toast.success("Xóa thành công");
      setReloadComment((prevState) => !prevState);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
          <img
            className="mr-2 h-[40px] w-[40px] rounded-full object-contain"
            src={data.user.avatar ? data.user.avatar : images.AvatarDefault}
            alt={data.user.fullName}
          />
          {data.user.fullName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022">
            {new Date(data.createdAt).toLocaleString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
              hour12: false,
            })}
          </time>
        </p>
      </div>

      <div className="ml-[48px] flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar
            key={index}
            className={clsx(
              "text-sm text-gray-400",
              index < data.rating && "text-yellow-400",
            )}
          />
        ))}
      </div>

      <div>
        <p className="ml-[48px] text-gray-500 dark:text-gray-400">
          {data.comment}
        </p>
      </div>

      {userState.id === data.user.id && (
        <div className="ml-[48px] mt-2 flex gap-3">
          <button className="tooltip" data-tip="Sửa">
            <FaRegEdit className="hover:text-primary" />
          </button>
          <button
            className="tooltip hover:text-red-500"
            data-tip="Xóa"
            onClick={() => {
              setOpenModalDeleteComment(true);
              setCommentIdDelete(data.id);
            }}
          >
            <FaRegTrashCan />
          </button>
        </div>
      )}

      {/* Modal */}
      <ModalConfirm
        heading="Xóa đánh giá"
        message="Bạn có chắc muốn xóa đánh giá này không?"
        onConfirm={handleConfirm}
        isShow={openModalDeleteComment}
        setIsShow={setOpenModalDeleteComment}
      />
    </div>
  );
}

export default Comment;
