import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./features/auth/authSlice";
import favouriteReducer from "./features/favourites/favouriteSlice";
import { getFavouritesFromLocalStorage } from "../Utils/localStorage";
import cartSliceReducer from "./features/cart/cartSlice";

const initialFavourites = getFavouritesFromLocalStorage();

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favourites: favouriteReducer,
    cart: cartSliceReducer,
  },
  preloadedState: {
    favourites: initialFavourites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
