import { getReviewsPage } from "@/services/reviewService";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentPage: 0,
  totalPage: 1,
  isLoading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews",
  async ({ pageNo, pageSize, productId }) => {
    try {
      const { statusCode, data } = await getReviewsPage(
        pageNo,
        pageSize,
        productId,
      );

      if (statusCode >= 100 && statusCode < 400) return data;
    } catch (error) {
      return error;
    }
  },
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setCurrentPage } = reviewSlice.actions;

export default reviewSlice.reducer;
