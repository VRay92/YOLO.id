import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token from header:', token);
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decodedToken = verify(token, process.env.TOKEN_KEY || 'secret');
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const authorizeCustomer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user;

  if (user.role !== 'customer') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};

export const authorizeOrganizer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user;

  if (user.role !== 'organizer') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};
