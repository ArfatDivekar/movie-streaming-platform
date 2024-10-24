import React from 'react'
import { Link } from 'react-router-dom';
import { FaPlay } from "react-icons/fa6";


const Movie = ({ movie }) => {
  return (
    <>
        <div className="h-[425px] border border-border p-[6px] hover:scale-95 transitions relative rounded-xl overflow-hidden">
            <Link to={`/movie/${movie?._id}`}>
                <img 
                    src={movie?.cardImage ? movie?.cardImage : "/images/50955.png"}
                    alt={movie.name}
                    className='w-full h-[410px] object-cover rounded-lg' />
            </Link>
            <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                <h3 className='font-semibold truncate'>{movie?.name}</h3>
                <button className="w-9 h-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white">
                    <FaPlay />
                </button>
            </div>
        </div>
    </>
  )
}

export default Movie