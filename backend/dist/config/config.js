"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config_port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log('checking if its connected ');
exports.config_port = process.env.PORT;
