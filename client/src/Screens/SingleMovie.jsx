import React, { useContext, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/MovieData Page/MovieInfo";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Notifications/Loader";
import { getMovieByIdAction } from "../Redux/Actions/MoviesAction";
import { RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";

const SingleMovie = () => {
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  // const movie = Movies.find((movie) => movie.name === id)

  const dispatch = useDispatch();

  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { movies } = useSelector((state) => state.getAllMovies);

  //Download movie Video url
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  //USE EFFECT
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <MovieInfo movie={movie} DownloadVideo={DownloadMovieVideo} progress={progress}/>
        </>
      )}
      {/* <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts />
        </div> */}
    </Layout>
  );
};

export default SingleMovie;
