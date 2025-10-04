import express, { Request, Response, Router } from 'express';
import {
  signUp,
  login,
  logout,
  updateProfile,
  checkUserAuth,
} from '../controller/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';
import { arjectProtection } from '../middleware/arcject.middleware';
const router = Router();
// these code will be uncommented after deployment
// router.use(arjectProtection);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
// this route is going to be protected
router.put('/update-profile', protectRoute, updateProfile);
router.get('/check', protectRoute, checkUserAuth);

export default router;
