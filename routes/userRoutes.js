const express = require("express");

const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  login,
  logout,
  getUser,
  register,
  loginStatus,
} = require("../controllers/user");

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/getuser", protect, getUser);

router.get("/loggedin", loginStatus);

module.exports = router;
