import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import categoryReducer from "./features/categorySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      categoryReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
