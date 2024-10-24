import * as movieConstants from "../Constants/MovieConstants"
import * as moviesAPIs from "../APIs/MovieServices"
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// GET ALL MOVIIES ACTION 
export const getAllMoviesAction = ({
    category = "", 
    time = "", 
    language = "", 
    rate = "", 
    year = "", 
    search = "", 
    pageNumber = "",
}) => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.MOVIES_LIST_REQUEST});
        const response = await moviesAPIs.getAllMoviesService(
            category, 
            time, 
            language, 
            rate, 
            year, 
            search, 
            pageNumber
        );
        dispatch({ type: movieConstants.MOVIES_LIST_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.MOVIES_LIST_FAIL)
    }
}


//GET RANDOM MOVIES ACTION
export const getRandomMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.MOVIES_RANDOM_REQUEST });
        const response = await moviesAPIs.getRandomMovieService();

        dispatch({ type: movieConstants.MOVIES_RANDOM_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.MOVIES_RANDOM_FAIL)
    }
}


//GET MOVIE BY ID ACTION
export const getMovieByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.MOVIES_DETAILS_REQUEST });
        const response = await moviesAPIs.getMovieByIdService(id);

        dispatch({ type: movieConstants.MOVIES_DETAILS_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.MOVIES_DETAILS_FAIL)
    }
}


//GET TOP RATED MOVIE ACTION
export const getTopRatedMovieAction = () => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.MOVIES_TOP_RATED_REQUEST });
        const response = await moviesAPIs.getTopRatedMoviesService();

        dispatch({ type: movieConstants.MOVIES_TOP_RATED_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.MOVIES_TOP_RATED_FAIL)
    }
}


//DELETE MOVIE ACTION
export const deleteMovieAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.DELETE_MOVIE_REQUEST });
        const response = await moviesAPIs.deleteMovieService(tokenProtection(getState), id);

        dispatch({ type: movieConstants.DELETE_MOVIE_SUCCESS, payload: response });
        toast.success("Movie deleted successfully")
        dispatch(getAllMoviesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.DELETE_MOVIE_FAIL)
    }
}


//DELETE ALL MOVIE ACTION
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.DELETE_ALL_MOVIE_REQUEST });
        const response = await moviesAPIs.deleteAllMovieService(tokenProtection(getState));

        dispatch({ type: movieConstants.DELETE_ALL_MOVIE_SUCCESS, payload: response });
        toast.success("All movies deleted successfully")
        dispatch(getAllMoviesAction({}));
    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.DELETE_ALL_MOVIE_FAIL)
    }
}


//CREATE MOVIE ACTION
export const createMoviesAction = (movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.CREATE_MOVIE_REQUEST });
        const response = await moviesAPIs.createMovieService(
            tokenProtection(getState),
            movie
        );

        dispatch({ 
            type: movieConstants.CREATE_MOVIE_SUCCESS, 
            payload: response,
        });
        toast.success("Movie created successfully")
    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.CREATE_MOVIE_FAIL)
    }
}


//UPDATE MOVIE ACTION
export const updateMoviesAction = (id, movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.UPDATE_MOVIE_REQUEST });
        const response = await moviesAPIs.updateMovieService(
            tokenProtection(getState),
            id,
            movie
        );

        dispatch({ 
            type: movieConstants.UPDATE_MOVIE_SUCCESS, 
            payload: response,
        });
        toast.success("Movie updated successfully")
        dispatch(getMovieByIdAction(id))
    } catch (error) {
        ErrorsAction(error, dispatch, movieConstants.UPDATE_MOVIE_FAIL)
    }
}