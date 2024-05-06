import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const passwordValidation = [
  body("password").notEmpty().isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0,
  }),
  (req: Request, resp: Response, next: NextFunction) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
      return resp.status(400).send({ error: errorValidator });
    }
    next();
  },
];