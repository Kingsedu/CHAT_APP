"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
router.post('/sign', auth_controller_1.signUp);
router.post('/login', auth_controller_1.login);
router.get('/logout', auth_controller_1.logout);
exports.default = router;
