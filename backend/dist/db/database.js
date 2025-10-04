"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDataBase = async (url) => {
    try {
        if (!url) {
            throw new Error('Mongo_url is not set');
        }
        await mongoose_1.default.connect(url);
        console.log('connection is successful to database');
    }
    catch (e) {
        console.log('THIS_IS_SERVE_ERROR ', e);
        process.exit(1);
        // 1 status code means failed, 0 means success
    }
};
exports.default = connectDataBase;
