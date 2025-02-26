import React from "react";

function LoadingDotsFullScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );
}

export default LoadingDotsFullScreen;
