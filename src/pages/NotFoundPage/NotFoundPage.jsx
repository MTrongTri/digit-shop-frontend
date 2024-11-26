import { images } from "@/constants";

function NotFoundPage() {
  return (
    <div className="h-screen w-full">
      <img src={images.ErrorNotFound} alt="" className="h-full w-full" />
    </div>
  );
}

export default NotFoundPage;
