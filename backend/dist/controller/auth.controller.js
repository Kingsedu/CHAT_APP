"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
const signUp = (req, res) => {
    res.send('SignUp endpoint');
};
exports.signUp = signUp;
const login = (req, res) => {
    res.send('login endpoint');
};
exports.login = login;
const logout = (req, res) => {
    res.send('Logout Endpoint');
};
exports.logout = logout;
