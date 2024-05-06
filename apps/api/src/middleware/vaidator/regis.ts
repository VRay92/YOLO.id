import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const regisValidation = [
  body('username')
    .if((value, { req }) => req.body.role === 'customer')
    .notEmpty()
    .withMessage('Username is required'),
  body('companyName')
    .if((value, { req }) => req.body.role === 'organizer')
    .notEmpty()
    .withMessage('Company Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['customer', 'organizer']),
  body('age')
    .if((value, { req }) => req.body.role === 'customer')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 17, max: 120 })
    .withMessage('Age must be between 17 and 120'),
  body('gender')
    .if((value, { req }) => req.body.role === 'customer')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female', 'other']),
  body('referralCode').optional().isString(),
  (req: Request, resp: Response, next: NextFunction) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
      return resp.status(400).send({ errors: errorValidator.array() });
    }
    next();
  },
];
