import React from 'react'
import BannerData from '../BannerData'
import { FaShareAlt,FaPlay } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { TbLanguageKatakana } from "react-icons/tb";


const MovieInfo = ({ movie, DownloadVideo, progress }) => {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img 
        src={movie?.image ? movie?.image : "/images/50955.jpg"} 
        alt={movie?.name} 
        className='w-full h-full hidden xl:inline-block object-cover'/>

        <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 bottom-0 right-0 left-0">
          <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20">
            <div className="xl:col-span-1 w-full h-full xl:order-none order-last xl:h-header xl:w-[95%] bg-dry border border-gray-800 rounded-2xl overflow-hidden xl:ml-10">
              <img 
                src={movie?.cardImage ? movie?.cardImage : "/images/50955.jpg"} 
                alt={movie?.name} 
                className='w-full h-[full] object-cover' />
            </div>

            <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center xl:ml-12">
              <div className="col-span-3 flex flex-col gap-5">

                {/* Title */}
                <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                  {movie?.name}
                </h1>

                {/* Other details */}
                <div className="flex items-center gap-4 font-medium text-dryGray">
                  <div className="flex-colo bg-subMain text-xs px-2 py-1 rounded">
                    HD 4K
                  </div>
                    <BannerData movie={ movie && movie } />
                </div>

                {/* Movie description */}
                <p className="text-text text-sm leading-7">
                  {movie?.desc}
                </p>

                {/* Watch btn & Download btn */}
                <div className="grid grid-cols-7 sm:grid-cols-7 gap-4 p-6 mb-7 bg-main border border-gray-800 rounded-xl">

                    {/* Share btn */}
                    <div className="col-span-1 flex-colo ">
                      <span className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                        <TbLanguageKatakana className="w-5 h-5"/>
                      </span> 
                    </div>

                    {/* Language */}
                    <div className="col-span-3 flex-colo text-sm font-medium border-l border-border">
                      <p>Language :
                        <span className='ml-2 truncate'>{movie?.language}</span>
                      </p>
                    </div>

                    {/* Watch now btn */}
                    <div className="sm:col-span-3 col-span-3 flex justify-center items-center font-medium text-sm">
                      <Link to={`/watch/${movie?._id}`} className='bg-subMain hover:bg-dry transitions border-2 border-subMain rounded-full flex-rows gap-3 w-full sm:py-3 py-4' >
                      <FaPlay /> Watch
                      </Link>
                    </div>

                    {/* Download btn */}
                    {/* <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                      <button 
                        disabled={progress}
                        onClick={() => DownloadVideo(movie?.video, movie?.name)} 
                        className='bg-subMain hover:bg-dry transitions border-2 border-subMain rounded-full flex-rows gap-3 w-full sm:py-3 py-4'
                      >
                      <FaDownload /> Download
                      </button>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MovieInfo