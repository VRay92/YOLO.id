import Voucher from '@/app/participant/[token]/voucher/page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
};

const loadFromStorage = (): { token: string | null; isLoggedIn: boolean } => {
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    console.log('Loading token from local storage');
    if (storedToken) {
      return { token: storedToken, isLoggedIn: true };
    }
  }
  return { token: null, isLoggedIn: false };
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
    ...loadFromStorage(),
  },
  reducers: {
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
        referralCode?: string;
        points?: number;
        vouchers?: Voucher[];
      }>,
    ) => {
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

export const { setUser, resetUser, updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
