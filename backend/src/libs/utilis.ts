import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { jwt_secret } from '../config/config';
interface UserInfo {
  userId: string;
  res: Request;
}

export const generateToken = (userId: string, res: Response) => {
  if (!jwt_secret) {
    throw new Error('the secret is undefined');
  }
  const token = jwt.sign({ userId }, jwt_secret, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 1000 * 60 * 60,
    httpOnly: true, // prevents XSS attacks, : cross-site scripting
    sameSite: 'strict', // CSRF attacks
    secure: process.env.NODE_ENV === 'development' ? false : true,
  });
  return token;
};
