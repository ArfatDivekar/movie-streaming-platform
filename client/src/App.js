import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import NotFound from "./Screens/NotFound";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/Movies";
import SingleMovie from "./Screens/SingleMovie";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import Aos from "aos";
import Password from "./Screens/Dashboard/Password";
import FavouriteMovies from "./Screens/Dashboard/FavouriteMovies";
import MovieList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Users from "./Screens/Dashboard/Admin/Users";
import AddMovies from "./Screens/Dashboard/Admin/AddMovie";
import ToastConatiner from "./Components/Notifications/ToastContainer";
import { AdminProtectedRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesActions";
import toast from "react-hot-toast";
import EditMovie from "./Screens/Dashboard/Admin/EditMovie";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext, { SidebarContext } from "./Context/DrawerContext";
import TestingNavbar from "./Layout/Navbar/TestingNavbar";

function App() {
  Aos.init();
  const dispatch = useDispatch();
  // const {isError : catError } = useSelector((state) => state.categoryGetAll);

  //USE-EFFECT
  useEffect(() => {
    dispatch(getAllCategoriesAction());

    // if( isError || catError ) {
    //   toast.error(isError || catError)
    // }
  }, [dispatch]);

  return (
    <>
      <ToastConatiner />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* ************* PUBLIC ROUTERS ************* */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:search" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />

            {/* ************* PRIVATE PUBLIC ROUTERS ************* */}
            <Route element={<ProtectedRouter />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<Password />} />
              <Route path="/favourites" element={<FavouriteMovies />} />

              {/* ************* PRIVATE PUBLIC ROUTERS ************* */}
              <Route element={<AdminProtectedRouter />}>
                <Route path="/movies-list" element={<MovieList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users" element={<Users />} />
                <Route path="/add-movie" element={<AddMovies />} />
                <Route path="/edit-movie/:id" element={<EditMovie />} />



              {/* ************* TESTING RESPONSIVE NAVBAR ************* */}
                {/* <Route path="/navbar" element={<TestingNavbar />} /> */}
              </Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
}

export default App;
