import express, { Request, Response } from 'express';

export const signUp = (req: Request, res: Response) => {
  res.send('SignUp endpoint');
};

export const login = (req: Request, res: Response) => {
  res.send('login endpoint');
};

export const logout = (req: Request, res: Response) => {
  res.send('Logout Endpoint');
};
