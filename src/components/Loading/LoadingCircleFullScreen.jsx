import React from "react";
import { useSelector } from "react-redux";

function LoadingCircleFullScreen() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <span className="loading loading-spinner loading-lg absolute text-white"></span>
    </div>
  );
}

export default LoadingCircleFullScreen;
