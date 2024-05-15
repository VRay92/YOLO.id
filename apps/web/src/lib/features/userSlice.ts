import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '@/app/customer/[token]/voucher/page';
import { decode } from 'jsonwebtoken';

export interface IUserState {
  username: string;
  email: string;
  role: string;
  token: string;
  isLoggedIn: boolean;
  referralCode?: string;
  points?: number;
  vouchers?: Voucher[];
}

const initialState: IUserState = {
  username: '',
  email: '',
  role: '',
  token: '',
  isLoggedIn: false,
  points: 0, 
  vouchers: [], 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromToken: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      if (token) {
        const decodedToken = decode(token) as {
          id: number;
          username: string;
          email: string;
          role: string;
        };
        if (decodedToken) {
          state.username = decodedToken.username;
          state.email = decodedToken.email;
          state.role = decodedToken.role;
          state.token = token;
          state.isLoggedIn = true;
        }
      } else {
        state.username = '';
        state.email = '';
        state.role = '';
        state.token = '';
        state.isLoggedIn = false;
      }
    },
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.referralCode = action.payload.referralCode;
      state.points = action.payload.points;
      state.vouchers = action.payload.vouchers;
    },
    resetUser: (state) => {
      state.username = '';
      state.email = '';
      state.role = '';
      state.isLoggedIn = false;
    },
    updateUser: (
      state,
      action: PayloadAction<{
        username?: string;
        email?: string;
        referralCode?: string;
        points?: number;
        vouchers?: Voucher[];
      }>,
    ) => {
      if (action.payload.username !== undefined) {
        state.username = action.payload.username;
      }
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.referralCode !== undefined) {
        state.referralCode = action.payload.referralCode;
      }
      if (action.payload.points !== undefined) {
        state.points = action.payload.points;
      }
      if (action.payload.vouchers !== undefined) {
        state.vouchers = action.payload.vouchers;
      }
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      return initialState;
    },
  },
});

export const { setUser, resetUser, updateUser, logout, setUserFromToken } =
  userSlice.actions;
export default userSlice.reducer;
