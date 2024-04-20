//folder: routes
//filename: userRoutes.js
const express = require("express");
const router = express.Router();

const { registerUser, loginUser, currentUser, checkEmail } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

// Route to register a new user using registerUser controller.
router.post("/register", registerUser);

// Route to authenticate a user and issue a JWT using loginUser controller.
router.post("/login", loginUser);

// Route to check if an email exists in the database using checkEmail controller.
router.post('/check-email', checkEmail);

// Route to fetch the current user's data (JWT required) using currentUser controller.
router.get("/current", validateToken, currentUser);

module.exports = router;