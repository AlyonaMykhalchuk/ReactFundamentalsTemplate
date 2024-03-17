import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, action) => {
      return [...action.payload];
    },
    saveAuthor: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
