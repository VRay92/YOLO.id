import { genSalt, hash, compareSync } from 'bcrypt';
import prisma from '../prisma';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { forgotPassword, sendEmail } from '../utils/emailSender';
import { generateReferralCode } from '@/utils/referalGenerator';
import { validationResult } from 'express-validator';
import {
  invalidateForgotPasswordToken,
  validateForgotPasswordToken,
} from '@/utils/forgotPasswordToken';

export class AuthController {
  async registerUser(req: Request, resp: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        username,
        email,
        password,
        role,
        age,
        gender,
        referralCode: referralCodeInput,
      } = req.body;
      console.log({
        username,
        email,
        password,
        role,
        age,
        gender,
        referralCodeInput,
      });

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return resp.status(400).send({
          rc: 400,
          success: false,
          message: 'Email has already been registered',
        });
      }

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      const verificationToken = sign(
        { email },
        process.env.TOKEN_KEY || 'secret',
        { expiresIn: '1h' },
      );

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const referralCode = role === 'customer' ? generateReferralCode() : null;

      let referredById = null;
      if (role === 'customer' && referralCodeInput) {
        const referringUser = await prisma.user.findUnique({
          where: { referralCode: referralCodeInput },
        });

        if (referringUser) {
          referredById = referringUser.id;
        }
      }

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashPassword,
          role,
          ...(role === 'customer' && { referredById }),
          ...(role === 'customer' && { age: parseInt(age) }),
          ...(role === 'customer' && { gender }),
          ...(role === 'customer' && { referralCode }),
          verificationToken,
          otp,
        },
      });

      if (role === 'customer' && referredById) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 90);

        await prisma.userVoucher.create({
          data: {
            userId: newUser.id,
            discount: 10,
            expiresAt: expiryDate,
          },
        });
      }

      if (role === 'customer' && referredById) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 90);

        await prisma.userPoint.create({
          data: {
            userId: referredById,
            points: 10000,
            expiresAt: expiryDate,
          },
        });
      }

      const subject = 'Verify your email address';
      const content = null;
      const data = {
        username,
        otp: newUser.otp!,
        link: `http://localhost:3000/verify/${verificationToken}`,
      };
      await sendEmail(email, subject, content, data);

      return resp.status(201).send({
        rc: 201,
        success: true,
        message:
          'User registered successfully. Please check your email for verification.',
      });
    } catch (error) {
      console.log(error);
      return resp.status(500).send(error);
    }
  }

  async verifyEmail(req: Request, resp: Response) {
    try {
      const { token } = req.params;
      const { otp } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          verificationToken: token,
        },
      });

      if (!user) {
        return resp.status(400).send({
          rc: 400,
          success: false,
          message: 'Invalid verification token',
        });
      }

      if (user.otp !== otp) {
        return resp.status(400).send({
          rc: 400,
          success: false,
          message: 'Invalid OTP',
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          verificationToken: null,
          otp: null,
        },
      });
      return resp.status(200).send({
        rc: 200,
        success: true,
        message: 'Email verified successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      return resp.status(500).send(error);
    }
  }

  async signIn(req: Request, resp: Response) {
    try {
      const { email, password, role } = req.body;

      const findUser = await prisma.user.findFirst({
        where: {
          email,
          role,
          isVerified: true,
        },
      });

      if (findUser) {
        const isPasswordValid = await compareSync(password, findUser.password);
        if (!isPasswordValid) {
          return resp.status(401).send({
            rc: 401,
            success: false,
            message: 'Invalid password',
          });
        }

        const token = sign(
          { id: findUser.id, role: findUser.role },
          process.env.TOKEN_KEY || 'secret',
          { expiresIn: '24h' },
        );

        return resp.status(200).send({
          rc: 200,
          success: true,
          message: 'Sign in successful',
          data: {
            id: findUser.id,
            username: findUser.username,
            email: findUser.email,
            role: findUser.role,
          },
          token,
        });
      } else {
        return resp.status(404).send({
          rc: 404,
          success: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log(error);
      return resp.status(500).send({
        rc: 500,
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async forgotPassword(req: Request, resp: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return resp.status(400).json({ message: 'Email is required' });
      }

      const findUser = await prisma.user.findUnique({
        where: { email, isVerified: true },
      });

      if (!findUser) {
        return resp
          .status(400)
          .json({ message: 'User not found or not verified' });
      }

      const username = findUser.username;
      const token = sign(
        { id: findUser.id, role: findUser.role },
        process.env.TOKEN_KEY || 'secret',
        { expiresIn: '1h' },
      );

      const subject = 'Forgot Password [NEW]';
      const data = {
        username,
        link: `http://localhost:3000/verifyPassword/${token}`,
      };

      await forgotPassword(email, subject, null, data);

      return resp.status(201).json({
        rc: 201,
        success: true,
        result: data,
      });
    } catch (error) {
      const errorMessage =
        (error as any).message || 'An unknown error occurred';
      console.error('Forgot password error:', errorMessage);

      return resp.status(500).json({
        message: 'An error occurred while processing your request',
        error: errorMessage,
      });
    }
  }

  async verifyForgotPassword(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const isTokenValid = await validateForgotPasswordToken(token);

      if (!isTokenValid) {
        return res.status(400).send({ error: 'Invalid or expired token' });
      }

      const decodedToken = verify(token, process.env.TOKEN_KEY || 'secret') as {
        id: number;
      };
      const { id } = decodedToken;

      const findUser = await prisma.user.findUnique({ where: { id } });

      if (!findUser) {
        return res.status(400).send({ error: 'Invalid user' });
      }

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      await prisma.user.update({
        where: { id },
        data: { password: hashPassword },
      });

      await invalidateForgotPasswordToken(token);

      return res.status(200).send({
        rc: 200,
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      console.error('Error in verifyForgotPassword:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async keepLogin(req: Request, resp: Response) {
    try {
      const { id, role } = resp.locals.user;
      const user = await prisma.user.findUnique({
        where: { id },
      });
  
      if (user) {
        const token = sign(
          { id: user.id, role: user.role },
          process.env.TOKEN_KEY || 'secret',
          { expiresIn: '24h' },
        );
  
        console.log('User role:', user.role);
  
        return resp.status(200).send({
          rc: 200,
          success: true,
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          token,
        });
      } else {
        return resp.status(404).send({
          rc: 404,
          success: false,
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log(error);
      return resp.status(500).send(error);
    }
  }

  async checkEmailToken(req: Request, res: Response) {
    try {
      const { token } = req.params;

      // Cari user berdasarkan token verifikasi email
      const user = await prisma.user.findFirst({
        where: {
          verificationToken: token,
        },
      });

      if (!user) {
        return res.status(400).json({ success: false });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in checkEmailToken:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async checkResetToken(req: Request, res: Response) {
    try {
      const { token } = req.params;

      const isTokenValid = await validateForgotPasswordToken(token);

      return res.status(200).json({ isValid: isTokenValid });
    } catch (error) {
      console.error('Error in checkResetToken:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
