import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { FaRegListAlt } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import { getAllCategoriesAction } from "../../../Redux/Actions/CategoriesActions";
import Loader from "../../../Components/Notifications/Loader";
import Empty from "../../../Components/Notifications/Empty";
import { deleteMovieAction, getAllMoviesAction } from "../../../Redux/Actions/MoviesAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );

  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);

  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);

  // Delete movies
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  //Delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want to delete this movie?") &&
      dispatch(deleteMovieAction(id));
  };

  //USE-EFFECT
  useEffect(() => {
    // Get all users
    dispatch(getAllUsersAction());

    // Get all movies
    dispatch(getAllMoviesAction({}));

    // Get all categories
    dispatch(getAllCategoriesAction());

    // errors
    if (isError || catError || userError || deleteError) {
      toast.error("Something went wrong!");
    }

  }, [isError, dispatch, catError, userError, deleteError]);

  //DASHBOARD DATA
  const dashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-600",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.length || 0,
    },
  ];
  return (
    <Sidebar>
      <h2 className="font-semibold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {dashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-sm font-medium my-6 text-gray-300">Recent Movies</h3>

      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <Table
          data={movies?.slice(0, 7)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="Empty" />
      )}
    </Sidebar>
  );
};

export default Dashboard;
