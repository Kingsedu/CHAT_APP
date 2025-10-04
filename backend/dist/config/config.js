"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config_cloudinary_env = exports.email_from_name = exports.email_from = exports.resend_api_key = exports.jwt_secret = exports.mongo_url = exports.config_port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log('checking if its connected ');
exports.config_port = process.env.PORT;
exports.mongo_url = process.env.MONGO_URI;
exports.jwt_secret = process.env.JWT_SECRET;
exports.resend_api_key = process.env.RESEND_API_KEY;
exports.email_from = process.env.EMAIL_FROM;
exports.email_from_name = process.env.EMAIL_FROM_NAME;
exports.config_cloudinary_env = {
    cloudinary_apikey: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret_key: process.env.CLOUDINARY_API_SECRET,
    cloudinary_name: process.env.CLOUDINARY_NAME,
};
