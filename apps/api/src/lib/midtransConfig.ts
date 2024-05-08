import { MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from '@/config';
import midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

export default snap;
