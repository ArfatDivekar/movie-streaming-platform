import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import Empty from "../../../Components/Notifications/Empty";
import { FaBackward, FaForward } from "react-icons/fa";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesAction";

const MovieList = () => {
  const dispatch = useDispatch();

  // All movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );

  // Delete movies
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  // Delete all movies
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );

  //Delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want to delete this movie?") && dispatch(deleteMovieAction(id));
  };

  //Delete all movie handler
  const deleteAllMovieHandler = () => {
    window.confirm("Are you sure you want to delete all movies?") && dispatch(deleteAllMoviesAction());
  };

  //useEffect
  useEffect(() => {
    // errors
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }

    // Get all movies
    dispatch(getAllMoviesAction({}));
  }, [isError, dispatch, deleteError, allError]);

  // Pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="font-semibold">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMovieHandler}
              className="bg-subMain font-normal transitions hover:bg-main border border-subMain text-white py-2 px-6 rounded-md"
            >
              {allLoading ? "Deleteing...." : "Delete All"}
            </button>
          )}
        </div>

        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies && movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />

            {/* More Movies loading btn */}
            <div className="w-full flex-rows gap-6">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="text-white p-2 rounded font-semibold border-2 border-subMain bg-subMain"
              >
                <FaBackward className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className="text-white p-2 rounded font-semibold border-2 border-subMain bg-subMain"
              >
                <FaForward className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no movies" />
        )}
      </div>
    </Sidebar>
  );
};

export default MovieList;
