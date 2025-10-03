import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import ChatUser from '../models/User.models';
import { catchAsync } from 'async-handler-express';
import status from 'http-status';
import { generateToken } from '../libs/utilis';
import { sendWelcomeEmail } from '../emails/emailHandler';
import { RequestExtend } from '../middleware/auth.middleware';
import cloudinary from '../libs/cloudinary';
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

    try {
      await sendWelcomeEmail(
        newUser.email,
        newUser.fullName,
        process.env.CLIENT_URL as string,
      );
    } catch (e) {
      console.error('failed to send welcome email:', e);
    }
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'invalid credential...' });
    return;
  }
  const user = await ChatUser.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'Invalid Credentials' });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user?.password);

  if (!isPasswordCorrect) {
    res.status(400).json({ message: 'Invalid credential' });
    return;
  }

  generateToken(user._id as unknown as string, res);
  res.status(201).json({
    _id: user._id as unknown as string,
    email: user.email,
    profilePic: user.profilePic,
  });
});

export const logout = (req: Request, res: Response) => {
  // res.clearCookie("jwt") ---> this clears the logout out
  res.cookie('jwt', '', {
    maxAge: 0,
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const updateProfile = catchAsync(
  async (req: RequestExtend, res: Response) => {
    const { user } = req;
    if (!user) {
      res.status(401).json({ message: '' });
      return;
    }
    try {
      const { profilePic } = req.body;
      if (!profilePic) {
        res.status(400).json({ message: 'Profile pic is required' });
      }
      const userId = user?._id;
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await ChatUser.findByIdAndUpdate(
        userId,
        {
          profilePic: uploadResponse.secure_url,
        },
        { new: true },
      );
      res.status(200).json({ user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
);

export const checkUserAuth = (req: RequestExtend, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: 'not authorized' });
  }
  res.status(200).json(req.user);
};
