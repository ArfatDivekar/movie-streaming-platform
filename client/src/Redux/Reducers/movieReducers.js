import * as moviesConstants from "../Constants/MovieConstants"

// GET ALL MOVIES

export const moviesListReducer = (state = { movies: []}, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_LIST_REQUEST:
            return { isLoading: true};

        case moviesConstants.MOVIES_LIST_SUCCESS:
            return { 
                isLoading: false, 
                movies: action.payload.movies,
                pages: action.payload.pages,
                page: action.payload.page,
                totalMovies: action.payload.totalMovies,
            };

        case moviesConstants.MOVIES_LIST_FAIL:
            return { isLoading: false, isError: action.payload};

        default:
            return state;
    }
};

// GET RANDOM MOVIES

export const moviesRandomReducer = (state = { movies: []}, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_RANDOM_REQUEST:
            return { isLoading: true};

        case moviesConstants.MOVIES_RANDOM_SUCCESS:
            return { isLoading: false, movies: action.payload };

        case moviesConstants.MOVIES_RANDOM_FAIL:
            return { isLoading: false, isError: action.payload};

        default:
            return state;
    }
};

// GET MOVIE BY ID

export const moviesDetailsReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_DETAILS_REQUEST:
            return { isLoading: true};

        case moviesConstants.MOVIES_DETAILS_SUCCESS:
            return { isLoading: false, movie: action.payload };

        case moviesConstants.MOVIES_DETAILS_FAIL:
            return { isLoading: false, isError: action.payload};

        case moviesConstants.MOVIES_DETAILS_RESET:
            return { movie: {} };

        default:
            return state;
    }
};

// GET TOP RATED MOVIES

export const moviesTopRatedReducer = (state = { movies: []}, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_TOP_RATED_REQUEST:
            return { isLoading: true};

        case moviesConstants.MOVIES_TOP_RATED_SUCCESS:
            return { isLoading: false, movies: action.payload };

        case moviesConstants.MOVIES_TOP_RATED_FAIL:
            return { isLoading: false, isError: action.payload};

        default:
            return state;
    }
};

// DELETE MOVIE

export const deleteMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.DELETE_MOVIE_REQUEST:
            return { isLoading: true};

        case moviesConstants.DELETE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };

        case moviesConstants.DELETE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload};

        default:
            return state;
    }
};

// DELETE ALL MOVIE

export const deleteAllMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.DELETE_ALL_MOVIE_REQUEST:
            return { isLoading: true};

        case moviesConstants.DELETE_ALL_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };

        case moviesConstants.DELETE_ALL_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload};

        default:
            return state;
    }
};

// CREATE MOVIE

export const createMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.CREATE_MOVIE_REQUEST:
            return { isLoading: true};

        case moviesConstants.CREATE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };

        case moviesConstants.CREATE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload};

        case moviesConstants.CREATE_MOVIE_RESET:
            return {};

        default:
            return state;
    }
};

// UPDATE MOVIE

export const updateMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.UPDATE_MOVIE_REQUEST:
            return { isLoading: true};

        case moviesConstants.UPDATE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };

        case moviesConstants.UPDATE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload};

        case moviesConstants.UPDATE_MOVIE_RESET:
            return {};

        default:
            return state;
    }
};