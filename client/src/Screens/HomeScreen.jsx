import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/home/Banner";
import PopularMovies from "../Components/home/PopularMovies";
import TopRated from "../Components/home/TopRated";
import Promos from "../Components/home/Promos";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();

  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);

  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);

  //USE-EFFECT
  useEffect(() => {
    // Get random movies
    dispatch(getRandomMoviesAction());

    // Get all movies
    dispatch(getAllMoviesAction({}));

    // Get top rated movies
    dispatch(getTopRatedMovieAction());

    // errors
    if (isError || randomError || topError) {
      toast.error("Something went wrong!");
    }
  }, [isError, dispatch, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-4 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        {/* <Promos /> */}
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
