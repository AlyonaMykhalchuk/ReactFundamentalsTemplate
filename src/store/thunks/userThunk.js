import { getCurrentUser, logout } from "../../services";
import { removeUserData, setUserData } from "../slices/userSlice";

export const getUserThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const user = await getCurrentUser();
    console.log("USER=", user);
    dispatch(setUserData({ ...user.result, token }));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const logoutThunk = () => async (dispatch) => {
  try {
    await logout(); // Call the logout service
    dispatch(removeUserData()); // Update the Redux state to reflect the logout
  } catch (error) {
    console.error("Error during logout process:", error);
    // Optionally, dispatch an error action to handle the logout error
  }
};
