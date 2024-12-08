import React from "react";

function ModalConfirm({ heading, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      <div className="relative z-10 rounded bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold">{heading}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action flex justify-end gap-2">
          <button
            onClick={onConfirm}
            className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-80"
          >
            Xác nhận
          </button>
          <button
            onClick={onCancel}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
