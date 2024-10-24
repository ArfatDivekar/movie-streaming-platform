import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import BannerData from "../BannerData";
import { Link } from "react-router-dom";
import Loader from "../Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { FaPlay } from "react-icons/fa6";

const Swipper = ({ movies}) => {
  return (
    <Swiper
    pagination={true}
    slidesPerView={1}
    modules={[Pagination, Autoplay]}
    loop={true}
    speed={4000}
    autoplay={{ delay: 1000, disableOnInteraction: false }}
    className="mySwiper w-full xl:h-[500px] bg-dry lg:h-64 h-48 rounded-[10px]"
  >
    {movies?.slice(0, 10).map((movie, index) => (
      <SwiperSlide
        key={index}
        className="relative rounded-[10px] overflow-hidden"
      >
        <img
          src={movie?.image ? movie.image : "/images/50955.jpg"}
          alt={movie?.name}
          className="w-full object-cover"
          // width='full'
          // height={200}
        />

        <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <h1 className="xl:text-4xl truncate capitalize sm:text-2xl text-xl font-bold">
                {movie?.name}
            </h1>
            <div className="flex gap-5 items-center text-dryGray">
                <BannerData movie={movie} />
            </div>

            <div className="flex gap-5 item-center">
                <p className="bg-subMain transitions text-white px-8 py-3 rounded font-[600] sm:text-sm text-xs">
                    Watch Now
                </p>
                <Link to={`/movie/${movie?._id}`} className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30 hover:bg-opacity-70">
                  <FaPlay className="w-full h-full"/>
                </Link>
                {/* <button className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30 hover:bg-opacity-70">
                    <FaPlay className="w-full h-full"/>
                </button> */}
            </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  )
}

const Banner = ({ movies, isLoading}) => {

  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-48"

  return (
    <div className="relative w-full">
      {
        isLoading ? (
          <div className={sameClass}>
            <Loader/>
          </div>
        ) : movies?.length > 0 ? (
          <Swipper sameClass={sameClass} movies={movies}/>
        ) : (
          <div className={sameClass}>
            <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seems like we dont have any movie
            </p>
          </div>
        )
      }
    </div>
  );
};

export default Banner;
