import { combineReducers, configureStore } from "@reduxjs/toolkit"
import * as User from "./Reducers/userReducers"
import * as categories from "./Reducers/categoriesReducers"
import * as movies from "./Reducers/movieReducers"


const rootReducer = combineReducers({
    // User reducers here
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,
    userChangePassword: User.userChangePasswordReducer,
    userGetFavouriteMovies: User.userGetFavouriteMoviesReducer,
    userDeleteFavouriteMovies: User.userDeleteFavouriteMoviesReducer,
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUsersReducer,


    // categories reducers
    categoryGetAll: categories.getAllCategoriesReducer,
    categoryCreate: categories.createCategoryReducer,
    categoryUpdate: categories.updateCategoryReducer,
    categoryDelete: categories.deleteCategoryReducer,


    // movies reducers
    getAllMovies: movies.moviesListReducer,
    getRandomMovies: movies.moviesRandomReducer,
    getMovieById: movies.moviesDetailsReducer,
    getTopRatedMovie: movies.moviesTopRatedReducer,
    deleteMovie: movies.deleteMovieReducer,
    deleteAllMovies: movies.deleteAllMovieReducer,
    createMovie: movies.createMovieReducer,
    updateMovie: movies.updateMovieReducer,
});

// get user info from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// initialise
const initialState = {
    userLogin: { userInfo: userInfoFromStorage},
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
})