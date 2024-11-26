import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { GrNext, GrPrevious } from "react-icons/gr";

const HOME_SLIDER = [
  "/src/assets/images/home-slider-1.png",
  "/src/assets/images/home-slider-3.jpg",
  "/src/assets/images/home-slider-4.jpg",
  "/src/assets/images/home-slider-5.png",
];

function HomeSlider() {
  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);

  const onInit = (swiper) => {
    swiper.params.navigation.prevEl = btnPrevRef.current;
    swiper.params.navigation.nextEl = btnNextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  };

  return (
    <div className="relative mt-5 h-[160px] md:h-[460px]">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-gray-400 w-[40px] h-[4px] rounded-sm"></span>`;
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: btnPrevRef.current,
          nextEl: btnNextRef.current,
        }}
        onInit={onInit}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper h-full w-full rounded-md"
      >
        {HOME_SLIDER.map((item, index) => (
          <SwiperSlide key={index}>
            <img className="h-full w-full" src={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute left-8 top-1/2 z-10 -translate-y-1/2">
        <button
          ref={btnPrevRef}
          className="hidden cursor-pointer rounded-sm bg-gray-300 p-2 px-1 py-3 text-white opacity-30 hover:opacity-80 md:block"
        >
          <GrPrevious className="size-6" />
        </button>
      </div>
      <div className="absolute right-8 top-1/2 z-10 -translate-y-1/2">
        <button
          ref={btnNextRef}
          className="hidden cursor-pointer rounded-sm bg-gray-300 p-2 px-1 py-3 text-white opacity-30 hover:opacity-80 md:block"
        >
          <GrNext className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default HomeSlider;
