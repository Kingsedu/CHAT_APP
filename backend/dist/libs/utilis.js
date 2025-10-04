"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateToken = (userId, res) => {
    if (!config_1.jwt_secret) {
        throw new Error('the secret is undefined');
    }
    const token = jsonwebtoken_1.default.sign({ userId }, config_1.jwt_secret, {
        expiresIn: '7d',
    });
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 1000 * 60 * 60,
        httpOnly: true, // prevents XSS attacks, : cross-site scripting
        sameSite: 'strict', // CSRF attacks
        secure: process.env.NODE_ENV === 'development' ? false : true,
    });
    return token;
};
exports.generateToken = generateToken;
