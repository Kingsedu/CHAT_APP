import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../config/config';
import ChatUser from '../models/User.models';

interface DecodedToken extends JwtPayload {
  userId: string;
}
type UserParams = {
  fullName?: string;
  email?: string;
  password?: string;
  profilePic?: string;
};
export interface RequestExtend extends Request {
  user?: any;
}
export const protectRoute = async (
  req: RequestExtend,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized- No token provided' });
      return;
    }
    const decoded = jwt.verify(token, jwt_secret) as DecodedToken;
    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized- No token provided' });
      return;
    }
    const user = await ChatUser.findById(decoded?.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (e) {
    console.log('Error in protectRoute middleware:', e);
    res.status(401).json({ message: 'Unauthorized - Token error' });
  }
};
