import express, { Request, Response, Router } from 'express';
import {
  signUp,
  login,
  logout,
  updateProfile,
  checkUserAuth,
} from '../controller/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';
const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
// this route is going to be protected
router.put('/update-profile', protectRoute, updateProfile);
router.get('/check', protectRoute, checkUserAuth);

export default router;
