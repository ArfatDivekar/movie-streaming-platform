import React from 'react'
import { BsCollectionFill } from "react-icons/bs";
import Titles from '../Titles';
import Movie from '../Movie';
import Empty from '../Notifications/Empty';
import Loader from '../Notifications/Loader';

const PopularMovies = ({ isLoading, movies}) => {
  return (

    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill}/>
      {
        isLoading ? (
          <Loader/>
          ) : movies?.length > 0 ? (
          <div className="grid sm:mt-12 mt-6 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 ">
            {
              movies?.slice(0, 8).map((movie, index) => (
                <Movie key={index} movie={movie}/>
              ))
            }
          </div>
        ) : (
          <div className="mt-6">
            <Empty message="It seems like we dont have any movie" />
          </div>
        )
      }
      
    </div>
    
  )
}

export default PopularMovies