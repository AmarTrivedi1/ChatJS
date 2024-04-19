//folder: controllers
//filename: userController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password : " + hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});
module.exports = registerUser;

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );
        res.status(200).json({ accessToken, userName: user.username });
    } else {
        res.status(401);
        throw new Error("Unauthorized access. Email or Password is not valid");
    }
});
module.exports = { registerUser, loginUser };

//@desc Current user information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };

const checkEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).exec();
    if (user) {
        return res.json({ exists: true });
    } else {
        return res.json({ exists: false });
    }
});
module.exports = { registerUser, loginUser, currentUser, checkEmail };
