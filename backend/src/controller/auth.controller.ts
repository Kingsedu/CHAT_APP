import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import ChatUser from '../models/User.models';
import { catchAsync } from 'async-handler-express';
import status from 'http-status';
import { generateToken } from '../libs/utilis';
export const signUp = catchAsync(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400).json({ message: 'invalid credentials..' });
    return;
  }
  if (password.length < 6) {
    res
      .status(400)
      .json({ password: 'password must be greater than 6 characters' });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'inavlid email address' });
    return;
  }

  const user = await ChatUser.findOne({ email });
  if (user) {
    res.status(400).json({ message: 'email alreaddy exist' });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new ChatUser({
    fullName,
    email,
    password: hashedPassword,
  });
  // let id = newUser._id as unknown as string;
  if (newUser) {
    await newUser.save();

    generateToken(newUser._id as unknown as string, res);

    res.status(201).json({
      _id: newUser._id as unknown as string,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

export const login = (req: Request, res: Response) => {
  res.send('login endpoint');
};

export const logout = (req: Request, res: Response) => {
  res.send('Logout Endpoint');
};
