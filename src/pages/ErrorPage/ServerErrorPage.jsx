import { images } from "@/constants";
import React from "react";

function ServerErrorPage() {
  return (
    <div className="h-screen w-full bg-white">
      <img src={images.ServerError} alt="" className="mx-auto w-[600px]" />
    </div>
  );
}

export default ServerErrorPage;
