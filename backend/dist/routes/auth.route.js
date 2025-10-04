"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.signUp);
router.post('/login', auth_controller_1.login);
router.post('/logout', auth_controller_1.logout);
// this route is going to be protected
router.put('/update-profile', auth_middleware_1.protectRoute, auth_controller_1.updateProfile);
router.get('/check', auth_middleware_1.protectRoute, auth_controller_1.checkUserAuth);
exports.default = router;
