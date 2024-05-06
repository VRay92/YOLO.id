import prisma from '@/prisma';
import { verify } from 'jsonwebtoken';

// Function to invalidate a token
export async function invalidateForgotPasswordToken(
  token: string,
): Promise<void> {
  await prisma.invalidToken.create({
    data: { token },
  });
}

// Function to validate a token
export async function validateForgotPasswordToken(
  token: string,
): Promise<boolean> {
  const invalidToken = await prisma.invalidToken.findUnique({
    where: { token },
  });

  // If the token is found in invalid tokens, return false
  if (invalidToken) {
    return false;
  }

  // Verify and decode the token
  const decodedToken = verify(token, process.env.TOKEN_KEY || 'secret');
  const { exp } = decodedToken as { exp: number };
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token has expired
  if (exp < currentTime) {
    return false;
  }

  return true;
}
