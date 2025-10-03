import aj from '../libs/arcjet';
import { isSpoofedBot } from '@arcjet/inspect';
import express, { Request, Response, NextFunction } from 'express';
export const arjectProtection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ message: 'Too many Request' });
        return;
      } else if (decision.reason.isBot()) {
        res.status(403).json({ message: 'Bot access denied' });
        return;
      } else {
        res.status(403).json({ message: 'Access denied by security policy' });
        return;
      }
    }
    if (decision.results.some(isSpoofedBot)) {
      res.status(403).json({
        error: 'Spofed bot detected',
        message: 'Malicious bot activity detected',
      });
      return;
    }
  } catch (e) {
    console.log('Arcject Protection Error:', e);
    next();
  }
};
