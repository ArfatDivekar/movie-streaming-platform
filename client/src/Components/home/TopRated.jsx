import React, { useState } from "react";
import Titles from "../Titles";
import { FaBookmark, FaPlay } from "react-icons/fa6";
import { Movies } from "../../Data/MoviesData";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import Loader from "../Notifications/Loader";
import Empty from "../Notifications/Empty";

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-[6px] m-2 h-rate cursor-pointer hovered transitions border border-border bg-dry rounded-[15px] overflow-hidden">
            <img
              src={movie?.cardImage ? movie.cardImage : "images/50955.jpg"}
              alt={movie?.name}
              className="w-full h-[385px] object-cover rounded-[12px]"
            />

            <div className="px-4 hoveres transitions gap-6 text-center absolute bg-main bg-opacity-80 top-0 left-0 right-0 bottom-0">
              <Link
                to={`/movie/${movie?._id}`}
                className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                <FaPlay />
              </Link>
              <p className="semi-bold truncate text-wrap semi-bold text-xl line-clamp-2" >
                {movie?.name}
              </p>
              {/* <div className="flex gap-2 text-star">
                <RatingStars value={movie?.rate} />
              </div> */}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const TopRated = ({ movies, isLoading }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const sliderButtons =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";

  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={FaBookmark} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <Empty message="It seems like we dont have any movie"/>
        )}
        <div className="w-full px-1 flex-rows gap-6 pt-7">
          <button className={sliderButtons} ref={(node) => setPrevEl(node)}>
            <FaCaretLeft className="w-[18px] h-[22px]" />
          </button>
          <button className={sliderButtons} ref={(node) => setNextEl(node)}>
            <FaCaretRight className="w-[18px] h-[22px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
