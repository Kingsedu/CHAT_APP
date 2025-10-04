"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const User_models_1 = __importDefault(require("../models/User.models"));
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized- No token provided' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwt_secret);
        if (!decoded) {
            res.status(401).json({ message: 'Unauthorized- No token provided' });
            return;
        }
        const user = await User_models_1.default.findById(decoded?.userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (e) {
        console.log('Error in protectRoute middleware:', e);
        res.status(401).json({ message: 'Unauthorized - Token error' });
    }
};
exports.protectRoute = protectRoute;
