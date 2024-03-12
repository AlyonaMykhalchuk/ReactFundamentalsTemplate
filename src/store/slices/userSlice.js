import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, email, token } = action.payload;
      state.isAuth = true;
      state.name = name;
      state.email = email;
      state.token = token;
      localStorage.setItem("token", token); // Assuming you want to set token in localStorage here as well
    },
    removeUserData: (state) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("token"); // Clear the token from localStorage on logout
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
