import * as userConstants from "../Constants/userConstants"
import * as movieConstants from "../Constants/MovieConstants"
import * as CategoriesConstants from "../Constants/CategoriesConstants"

import * as userApi from "../APIs/userService"
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// login action
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST});
        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response});

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL)
    }
};


// register action
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST});
        const response = await userApi.registerService(datas);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response});
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response});
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL)
    }
};


// logout action
const logoutAction = () => (dispatch) => {
    userApi.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT })
    dispatch({ type: userConstants.USER_LOGIN_RESET })
    dispatch({ type: userConstants.USER_REGISTER_RESET })
    dispatch({ type: userConstants.DELETE_FAVOUTITE_MOVIES_RESET })
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET })
    dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET })
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET })
    dispatch({ type: userConstants.GET_FAVOURITE_MOVIES_RESET })
    dispatch({ type: userConstants.GET_ALL_USERS_RESET })
    dispatch({ type: userConstants.DELETE_USER_RESET })
    dispatch({ type: movieConstants.MOVIES_DETAILS_RESET })
    dispatch({ type: movieConstants.CREATE_MOVIE_RESET })
    dispatch({ type: movieConstants.UPDATE_MOVIE_RESET })
    dispatch({ type: CategoriesConstants.CREATE_CATEGORY_RESET })
    dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_RESET })
    dispatch({ type: CategoriesConstants.DELETE_CATEGORY_RESET })
}


//update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userApi.updateProfileService(user, tokenProtection(getState));
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: response,
        });
        toast.success("Profile updated");
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: response,
        })
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL)
    }
}


//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        await userApi.deleteProfileService(tokenProtection(getState));

        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
        toast.success("Profile deleted successfully");

        dispatch(logoutAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL)

    }
}


//change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userApi.changePasswordService(passwords, tokenProtection(getState));

        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response });
        // toast.success("Password changed successfully");

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL)

    }
}


//get all favourite movies action
const getFavouriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVOURITE_MOVIES_REQUEST });
        const response = await userApi.getFavouriteMovies(tokenProtection(getState));

        dispatch({ type: userConstants.GET_FAVOURITE_MOVIES_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_FAVOURITE_MOVIES_FAIL)
    }
}


//Delete all favourite movies action
const deleteFavouriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVOUTITE_MOVIES_REQUEST });
        await userApi.deleteFavouriteMovies(tokenProtection(getState));

        dispatch({ type: userConstants.DELETE_FAVOUTITE_MOVIES_SUCCESS });
        toast.success("Movies removed successfully")
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_FAVOUTITE_MOVIES_FAIL)
    }
}


// Admin get all users
const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        const response = await userApi.getAllUsersService(tokenProtection(getState));

        dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL)
    }
}


// Admin delete users
const deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USER_REQUEST });
        await userApi.deleteUsersService(id, tokenProtection(getState));

        dispatch({ type: userConstants.DELETE_USER_SUCCESS });
        toast.success("User deleted successfully")
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL)
    }
}

export { loginAction, registerAction, logoutAction, updateProfileAction, deleteProfileAction, changePasswordAction, getFavouriteMoviesAction, deleteFavouriteMoviesAction, getAllUsersAction, deleteUserAction }