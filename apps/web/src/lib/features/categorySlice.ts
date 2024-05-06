import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ICategory {
  id?: string;
  title?: string;
}

const data: ICategory[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState: [...data],
  reducers: {
    setCategory: (initialState, action) => {
      return [...action.payload];
    },
  },
});

const actions = {
  setCategoryAction: categorySlice.actions.setCategory,
};

export const { setCategoryAction } = actions;

export default categorySlice.reducer;

export const getCategory = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + `/categories`);
      console.log("Response from middleware", res.data);
      dispatch(setCategoryAction(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};
