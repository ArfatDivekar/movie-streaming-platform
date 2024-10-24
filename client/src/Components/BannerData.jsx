import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const BannerData = ({ movie }) => {
  return (
    <>
        <div className='flex items-center gap-2'>
            <span className="text-sm font-medium">
                {movie.category}
            </span>
        </div>

        <div className='flex items-center gap-2'>
            <FaCalendarAlt className='text-subMain w-3 h-3'/> 
            <span>
                {movie.year}
            </span>
        </div>

        <div className='flex items-center gap-2'>
            <FaClock className='text-subMain w-3 h-3'/> 
            <span>
                {movie.time} Hr
            </span>
        </div>
    </>
  )
}

export default BannerData