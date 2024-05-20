import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  event: {
    id: number;
    title: string;
  };
  totalPrice: number;
  discountAmount: number;
  status: string;
  createdAt: string;
  receiptUrl: string;
}

interface CustomerCount {
  date: string;
  count: number;
}

interface TransactionState {
  transactions: Transaction[];
  customerCountData: CustomerCount[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  customerCountData: [],
  loading: false,
  error: null,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getTransactionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
      state.loading = false;
    },
    getCustomerCountSuccess(state, action: PayloadAction<CustomerCount[]>) {
      state.customerCountData = action.payload;
      state.loading = false;
    },
    getTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsFailure,
  getCustomerCountSuccess,
} = transactionSlice.actions;

export const fetchTransactions =
  (token: string, eventId?: number, startDate?: string, endDate?: string) =>
  async (dispatch: any) => {
    try {
      dispatch(getTransactionsStart());
      let url = `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/transactions/filter`;
      const params: any = {};

      if (eventId) {
        params.eventId = eventId;
      }
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      const transactions = response.data.data;
      dispatch(getTransactionsSuccess(transactions));
    } catch (error: any) {
      dispatch(getTransactionsFailure(error.message));
    }
  };

export const fetchCustomerCount =
  (token: string, eventId?: number, startDate?: string, endDate?: string) =>
  async (dispatch: any) => {
    try {
      dispatch(getTransactionsStart());
      const params: any = {};

      if (eventId) {
        params.eventId = eventId;
      }
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      console.log('Fetching customer count with params:', params);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}organizer/customers-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        },
      );
      console.log('Response from /organizer/customers-count:', response.data);
      const customerCountData = Object.entries(response.data.data).map(
        ([date, count]) => ({
          date,
          count: count as number,
        }),
      );
      console.log('customerCountData:', customerCountData); 
      dispatch(getCustomerCountSuccess(customerCountData));
    } catch (error: any) {
      dispatch(getTransactionsFailure(error.message));
    }
  };

export default transactionSlice.reducer;
