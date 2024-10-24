import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavouriteMoviesAction,
  getFavouriteMoviesAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";
import Empty from "../../Components/Notifications/Empty";
import { SidebarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../Context/Functionalities";
import FileSaver from "file-saver";

const FavouriteMovies = () => {
  const dispatch = useDispatch();

  const { progress, setProgress } = useContext(SidebarContext);

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavouriteMovies
  );

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavouriteMovies);

  // Delete movies handler function
  const deletMovieHandler = () => {
    window.confirm("Are you sure you want to delete all movies") &&
      dispatch(deleteFavouriteMoviesAction());
  };

      //Download movie Video
      const DownloadMovieVideo = async (videoUrl, name) => {
        await DownloadVideo(videoUrl, setProgress).then((data) => {
          setProgress(0);
          FileSaver.saveAs(data, name);
        });
      };

  // useEffect
  useEffect(() => {
    dispatch(getFavouriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVOURITE_MOVIES_RESET"
          : "DELETE_FAVOUTITE_MOVIES_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="font-semibold">Favourites</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deletMovieHandler}
              className="bg-subMain font-normal transitions hover:bg-main border border-subMain text-white py-2 px-6 rounded-md"
            >
              {deleteLoading ? "Removing..." : "Remove All"}
            </button>
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table 
            data={likedMovies} 
            admin={false} 
            downloadVideo={DownloadMovieVideo} 
            progress={progress}/>
        ) : (
          <Empty message="No movies added in favourite" />
        )}
      </div>
    </Sidebar>
  );
};

export default FavouriteMovies;
