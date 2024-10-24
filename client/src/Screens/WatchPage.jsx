import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Movies } from "../Data/MoviesData";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RiMovie2Line } from "react-icons/ri";
import Loader from "../Components/Notifications/Loader";
import { getMovieByIdAction } from "../Redux/Actions/MoviesAction";
import { DownloadVideo } from "../Context/Functionalities";
import { SidebarContext } from "../Context/DrawerContext";
import FileSaver from "file-saver";

const WatchPage = () => {
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  // const movie = Movies.find((movie) => movie.name === id)

  const dispatch = useDispatch();

  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  //Download movie Video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // const movie = Movies.find((movie) => movie.name === id);
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();

  //USE EFFECT
  useEffect(() => {
    //Movie ID
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded-lg border-2 border-gray-800 p-6">
          <button
            onClick={() => navigate(-1)}
            className="md:text-xl text-sm flex gap-3 item-center font-bold text-dryGray"
          >
            <IoMdArrowRoundBack className="mt-1" /> {movie?.name}
          </button>

          {/* <div className="sm:w-auto flex-btn w-full gap-5"> */}
          {/* Add to favourite btn */}
          {/* <button className="bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3 text-sm">
              <FaHeart />
            </button> */}

          {/* Add to download btn */}
          {/* <button
              disabled={progress > 0 && progress < 100} 
              onClick={() => DownloadMovieVideo(movie?.video, movie?.name)}
              className="bg-subMain hover:text-white flex-rows gap-2 transitions font-medium text-white rounded px-8 py-3 text-sm">
              <FaDownload /> Download
            </button>
          </div> */}
        </div>

        {/* Watch video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-full rounded">
            <source src={movie?.video} type="video/mp4" title={movie?.name} />
          </video>
        ) : (
          <div className="w-full h-full xl:h-screen rounded-lg overflow-hidden relative">
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
                <div className="absolute bg-main bg-opacity-30 left-0 right-0 top-0 bottom-0 flex-colo">
                  <button
                    // onClick={() => setPlay(true)}
                    onClick={() =>
                      alert(
                        "I haven't added the trailer's because they make the site load slower. Sorry :)"
                      )
                    }
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>

                <img
                  src={movie?.image ? movie?.image : `/images/50955.jpg`}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;
