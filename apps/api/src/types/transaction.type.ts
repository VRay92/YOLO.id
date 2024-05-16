export interface UserPoint {
    id: number;
    userId: number;
    points: number;
    expiresAt: Date;
    createdAt: Date;
    transactionId?: number;
  }