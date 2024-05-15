import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const TOKEN_KEY = process.env.TOKEN_KEY;
export const MAX_FORGOT_PASSWORD = process.env.MAX_FORGOT_PASSWORD;
export const MAIL_SENDER = process.env.MAIL_SENDER;
export const MAIL_APP_PASSWORD = process.env.MAIL_APP_PASSWORD;
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-client-1e29j89fkpFU_0NQ";
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
