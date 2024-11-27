import React from "react";

function ModalConfirm() {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ModalConfirm;
