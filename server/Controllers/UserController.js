import asyncHandler from "express-async-handler"
import User from "../Models/UserModels.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../middlewares/Auth.js";


// ***************************************
// ********** PUBLIC CONTROLLERS *********
// ***************************************

// @desc Register user
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler (async (req, res) => {
    const {fullName, email, password, image} = req.body;
    try {
        const userExists = await User.findOne({ email });

        // check if user exists
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in DB
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        // if user is created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }

    } catch(error) {
        res.status(400).json({ message: error.message})
    }

});

// @desc Register user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;
    try {
        //find user in DB
        const user = await User.findOne({ email });
        //if user exists compare password with hashed password then send user data and token to client
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });

            //if user not found oor password doesnt match send an error message
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// ********** PRIVATE CONTROLLERS **********

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    console.log("UpdateUserProfile controller reached");
    const {fullName, email, image} = req.body;
    try {
        // find user in DB 
        const user = await User.findById(req.user._id);
        // if user exists then update user data and save it in DB
        if(user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();
            // send updated users data n token to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            });
        }

        // else send error message
        else {
            console.log("User not found");
            res.status(404);
            throw new Error("User not found");
        }

    } catch (error) {
        console.log("Error in updateUserProfile controller:", error.message);
        res.status(400).json({ message: error.message });
    }
});


// @desc Delete user profile
// @route DELETE /api/users
// @access Private

const deleteUserProfile = asyncHandler(async(req, res) => {
    try {
        // find user in DB 
        const user = await User.findById(req.user._id);
        // if user exists then delete from DB
        if(user) {
            // if user is Admin throw error message
            if(user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete Admin");
            }
            // else delete user from DB
            await User.deleteOne({ _id: user._id });
            res.json({ message: "User deleted successfully"})
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// @desc Change user password
// @route PUT /api/users/password
// @access Private

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        //find user in DB
        const user = await User.findById(req.user._id);
        // if user exists then compare old password with hashed password and then update new password and save it in DB
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Password changed successfully"});
        }
        // else send error message
        else {
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// @desc get all liked
// @route GET /api/users/favourites
// @access Private

const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        //find user in DB
        const user = await User.findById(req.user._id).populate("likedMovies");
        // if user exists then send liked movies to client
        if (user) {
            res.json(user.likedMovies);
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// @desc add liked movie
// @route POST /api/users/favourites
// @access Private

const addLikedMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        const user = await User.findById(req.user._id)
        // if user exists then add the movie to liked movie and save to DB
        if (user) {
            //check if movie is already liked
            //if it is already liked then send error message
            if (user.likedMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Movie is already liked");
            }
            // else add move to liked movies and save it in DB
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        }

        //else send error message
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// @desc Delete all liked movie
// @route DELETE /api/users/favourites
// @access Private

const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists delete all liked movies and save it in DB
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({ message: "All favourite movies deleted successfully"});
        }

        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




// ***************************************
// ********** ADMIN CONTROLLERS **********
// ***************************************

// @desc Get all users
// @route GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    try {
        // find all users in DB
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if (user) {
            // if user is admin throw error message
            if(user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete Admin");
            }

            // else delete user from DB
            await user.deleteOne();
            res.json({ message: "User deleted successfully" });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})




export { registerUser, loginUser, updateUserProfile, deleteUserProfile, changeUserPassword, getLikedMovies, addLikedMovies, deleteLikedMovies, getUsers, deleteUser };