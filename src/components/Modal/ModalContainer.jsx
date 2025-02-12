import React from "react";

function ModalContainer({ isShow, children }) {
  if (!isShow) return;

  return (
    <div className="fixed inset-0 z-[50]">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="z-100 relative h-full">{children}</div>
    </div>
  );
}

export default ModalContainer;
