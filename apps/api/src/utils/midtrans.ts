import axios from 'axios';
const base64 = require('base-64');

export async function initiatePayment(orderId: string, amount: number) {
  const serverKey = 'SB-Mid-server-Bjq9V2ze_hvjg0og3ahhmSMv';
  const authString = base64.encode(`${serverKey}:`);

  const options = {
    method: 'POST',
    url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${authString}`,
    },
    data: {
      transaction_details: { order_id: orderId, gross_amount: amount },
      credit_card: { secure: true },
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Payment Error:', error);
    throw error;
  }
}
