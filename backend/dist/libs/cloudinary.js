"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config/config");
cloudinary_1.v2.config({
    cloud_name: config_1.config_cloudinary_env.cloudinary_name,
    api_key: config_1.config_cloudinary_env.cloudinary_apikey,
    api_secret: config_1.config_cloudinary_env.cloudinary_secret_key,
});
exports.default = cloudinary_1.v2;
