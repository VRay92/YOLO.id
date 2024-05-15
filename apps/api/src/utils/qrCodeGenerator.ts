import { v4 as uuidv4 } from 'uuid';

export const generateQRCode = async (): Promise<string> => {
  try {
    const uniqueCode = uuidv4(); 
    return `QRCode-${uniqueCode}`;
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};
