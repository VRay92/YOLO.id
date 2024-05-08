declare module 'midtrans-client' {
  export class Snap {
    constructor(options: SnapOptions);
    createTransaction(params: TransactionDetails): Promise<{ token: string }>;
    transaction: {
      notification(notificationData: any): Promise<boolean>;
    };
  }

  interface SnapOptions {
    isProduction?: boolean;
    serverKey: string;
    clientKey?: string;
  }

  interface TransactionDetails {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    customer_details?: {
      email: string;
      first_name: string;
    };
  }
}
