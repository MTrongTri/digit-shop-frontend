import React from "react";

function ModalContainer({ children }) {
  return (
    <div className="fixed inset-0 z-[50]">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="z-100 relative flex h-full px-4 md:px-0">{children}</div>
    </div>
  );
}

export default ModalContainer;
