import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  username: string;
  email: string;
  role: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  username: '',
  email: '',
  role: '',
  token: '',
  isLoggedIn: false,
};

const loadTokenFromStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    console.log('Loading token from local storage');
    if (storedToken) {
      return storedToken;
    }
  }
  return null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialState, token: loadTokenFromStorage() },
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    resetUser: (state) => {
      state.username = '';
      state.email = '';
      state.role = '';
      state.isLoggedIn = false;
    },
    updateUser: (
      state,
      action: PayloadAction<{ username?: string; email?: string; role?: string }>
    ) => {
      if (action.payload.username !== undefined) {
        state.username = action.payload.username;
      }
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.role !== undefined) {
        state.role = action.payload.role;
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