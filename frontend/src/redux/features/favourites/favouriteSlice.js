import { createSlice } from "@reduxjs/toolkit";

const favourtieSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      // Checking that isn't already in favourites
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      // removing it if it matches
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavourites: (state, action) => {
      // set the favourites from localStorage
      return action.payload;
    },
  },
});
export const { addToFavourites, removeFromFavourites, setFavourites } =
  favourtieSlice.actions;
export const selectFavouriteProduct = (state) => state.favourites;

export default favourtieSlice.reducer;
