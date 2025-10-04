"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAuth = exports.updateProfile = exports.logout = exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_models_1 = __importDefault(require("../models/User.models"));
const async_handler_express_1 = require("async-handler-express");
const utilis_1 = require("../libs/utilis");
const emailHandler_1 = require("../emails/emailHandler");
const cloudinary_1 = __importDefault(require("../libs/cloudinary"));
exports.signUp = (0, async_handler_express_1.catchAsync)(async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        res.status(400).json({ message: 'invalid credentials..' });
        return;
    }
    if (password.length < 6) {
        res
            .status(400)
            .json({ password: 'password must be greater than 6 characters' });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'inavlid email address' });
        return;
    }
    const user = await User_models_1.default.findOne({ email });
    if (user) {
        res.status(400).json({ message: 'email alreaddy exist' });
        return;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const newUser = new User_models_1.default({
        fullName,
        email,
        password: hashedPassword,
    });
    // let id = newUser._id as unknown as string;
    if (newUser) {
        await newUser.save();
        (0, utilis_1.generateToken)(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
        try {
            await (0, emailHandler_1.sendWelcomeEmail)(newUser.email, newUser.fullName, process.env.CLIENT_URL);
        }
        catch (e) {
            console.error('failed to send welcome email:', e);
        }
    }
    else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});
exports.login = (0, async_handler_express_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'invalid credential...' });
        return;
    }
    const user = await User_models_1.default.findOne({ email });
    if (!user) {
        res.status(400).json({ message: 'Invalid Credentials' });
        return;
    }
    const isPasswordCorrect = await bcryptjs_1.default.compare(password, user?.password);
    if (!isPasswordCorrect) {
        res.status(400).json({ message: 'Invalid credential' });
        return;
    }
    (0, utilis_1.generateToken)(user._id, res);
    res.status(201).json({
        _id: user._id,
        email: user.email,
        profilePic: user.profilePic,
    });
});
const logout = (req, res) => {
    // res.clearCookie("jwt") ---> this clears the logout out
    res.cookie('jwt', '', {
        maxAge: 0,
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
exports.updateProfile = (0, async_handler_express_1.catchAsync)(async (req, res) => {
    const { user } = req;
    if (!user) {
        res.status(401).json({ message: '' });
        return;
    }
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            res.status(400).json({ message: 'Profile pic is required' });
        }
        const userId = user?._id;
        const uploadResponse = await cloudinary_1.default.uploader.upload(profilePic);
        const updatedUser = await User_models_1.default.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url,
        }, { new: true });
        res.status(200).json({ user: updatedUser });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
const checkUserAuth = (req, res) => {
    if (!req.user) {
        res.status(400).json({ message: 'not authorized' });
    }
    res.status(200).json(req.user);
};
exports.checkUserAuth = checkUserAuth;
