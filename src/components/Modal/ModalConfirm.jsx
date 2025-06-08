import React from "react";
import ModalContainer from "./ModalContainer";

function ModalConfirm({ heading, message, isShow, setIsShow, onConfirm }) {
  if (!isShow) return;

  return (
    <ModalContainer>
      <div className="m-auto flex w-[480px] flex-col rounded-md bg-white p-6">
        <div>
          <h3 className="text-lg font-bold">{heading}</h3>
          <p className="py-4">{message}</p>
        </div>
        <div className="modal-action flex justify-end gap-2">
          <button
            onClick={onConfirm}
            className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-80"
          >
            Xác nhận
          </button>
          <button
            onClick={() => setIsShow(false)}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
          >
            Hủy
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ModalConfirm;
