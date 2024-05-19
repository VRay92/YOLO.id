export interface UserPoint {
  id: number;
  userId: number;
  points: number;
  expiresAt: Date;
  createdAt: Date;
  transactionId?: number;
}

export interface TicketType {
  ticketTypeId: number;
  quantity: number;
}

export enum STATUS {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  SUCCESS = 'success',
}