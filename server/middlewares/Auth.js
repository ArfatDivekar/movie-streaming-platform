import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";

// @desc Authenticated user & get token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};

// Protection middleware
const protect = asyncHandler(async (req, res, next) => {
    console.log("Protect middleware reached");
    
    let token;

    // Check if token exists in header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Set token from Bearer token in header
        try {
            token = req.headers.authorization.split(" ")[1];
            
            // Verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user id from decoded token
            req.user = await User.findById(decoded.id).select("-password");
            
            console.log("User authenticated:", req.user);
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            res.status(401);
            throw new Error("Not authorized, Token failed");
        }
    }

    // If token doesn't exist in header, send an error
    if (!token) {
        console.log("No token found");
        res.status(401);
        throw new Error("Not authorized, No token");
    }
});




// Admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an Admin");
    }
}

export { generateToken, protect, admin };
