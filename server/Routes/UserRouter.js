import express from "express";
import {
  addLikedMovies,
  changeUserPassword,
  deleteLikedMovies,
  deleteUserProfile,
  deleteUser,
  getLikedMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// ********** PUBLIC ROUTES **********
router.post("/", registerUser);
router.post("/login", loginUser);

// ********** PRIVATE ROUTES **********
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favourites", protect, getLikedMovies);
router.post("/favourites", protect, addLikedMovies);
router.delete("/favourites", protect, deleteLikedMovies);

// ********** PRIVATE ROUTES **********
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
