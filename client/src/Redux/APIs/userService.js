import Axios from "./Axios"

// register new user API call
const registerService = async (user) => {
    const {data} = await Axios.post("/users", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

//logout user function
const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null;
}

//login user API call
const loginService = async (user) => {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// update profile API call
const updateProfileService = async (user, token) => {
    const { data } = await Axios.put("/users", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
}

// delete profile API call
const deleteProfileService = async (token) => {
    const { data } = await Axios.delete("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (data) {
        localStorage.removeItem("userInfo");
    }
    return data;
}

// change profile password API call
const changePasswordService = async (passwords, token) => {
    const { data } = await Axios.put("/users/password", passwords, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
}

// Get favourite movies API call
const getFavouriteMovies = async (token) => {
    const { data } = await Axios.get("/users/favourites", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
};

// Delete all favourite API call
const deleteFavouriteMovies = async (token) => {
    const { data } = await Axios.delete("/users/favourites", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
};

// Get all users API call
const getAllUsersService = async (token) => {
    const { data } = await Axios.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
};

// Delete all users API call
const deleteUsersService = async (id, token) => {
    const { data } = await Axios.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return data;
};


export { registerService, logoutService, loginService, updateProfileService, deleteProfileService, changePasswordService, getFavouriteMovies, deleteFavouriteMovies, getAllUsersService, deleteUsersService }