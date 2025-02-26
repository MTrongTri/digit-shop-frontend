import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/stores/userSlice";
import loadingReducer from "@/stores/loadingSlice";
import cartReducer from "@/stores/cartSlice";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: {
    userInfo: userInfoFromStorage,
  },
};

const store = configureStore({
  reducer: { user: userReducer, loading: loadingReducer, cart: cartReducer },
  preloadedState: initialState,
});

export default store;
