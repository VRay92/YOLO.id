import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import path from 'path';

export const generateQRCode = async (): Promise<string> => {
  const receiptId = uuidv4();
  const receiptUrl = `https://example.com/receipts/${receiptId}`;

  const qrCodePath = path.join(__dirname, '..', 'public', 'qrcodes', `${receiptId}.png`);
  await QRCode.toFile(qrCodePath, receiptUrl);

  return `/qrcodes/${receiptId}.png`;
};