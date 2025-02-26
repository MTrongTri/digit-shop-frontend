import { countCartItem } from "@/services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MdTry } from "react-icons/md";

const initialState = {
  totalItem: 0,
  isLoading: false,
  error: null,
};

export const countCartItemFetch = createAsyncThunk(
  "cart/items/count",
  async () => {
    try {
      const { statusCode, data } = await countCartItem();
      if (statusCode) return data.totalItem;
    } catch (error) {
      return error;
    }
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(countCartItemFetch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countCartItemFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalItem = action.payload;
      })
      .addCase(countCartItemFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { updateTotalItem } = cartSlice.actions;

export default cartSlice.reducer;
