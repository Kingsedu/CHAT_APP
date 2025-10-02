import express, { Request, Response, Router } from 'express';
import { signUp, login, logout } from '../controller/auth.controller';
const router = Router();

router.post('/sign', signUp);
router.post('/login', login);
router.get('/logout', logout);

export default router;
