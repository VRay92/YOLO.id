import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import categoryReducer from './features/categorySlice';
import eventReducer from './features/eventSlice';
import transactionReducer from './features/transactionSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      categoryReducer,
      eventReducer,
      transactionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
