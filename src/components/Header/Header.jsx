import React from "react";

import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserNameSelector } from "../../store/selectors";
import { removeUserData } from "../../store/slices/userSlice";
// Module 1:
// * add Logo and Button components
// * add Header component to the App component
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#header

// Module 2:
// * show user's name if he is logged in.
// * navigate to the /login route after 'LOGOUT' button click
// * hide 'LOGOUT' button and user's name for Login and Registration pages
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#header

// Module 3:
// * get user's name from the store. Use selector...
// * remove user's data from the store. Use action 'removeUserData' from the 'src/store/slices/userSlice by LOGOUT button click
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#header

// Module 4:
// make a request to lod out on 'LOGOUT' button click
// use thunk 'logoutThunk' from 'src/store/thunks/userThunk.js' and service 'logout' from 'src/services.js'
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function

// Module 5:
// *proposed cases for unit tests:
//   ** Header should have logo and user's name.

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector(getUserNameSelector);
  const isUserLoggedIn = useSelector((state) => state.user.isAuth);
  const handleLogout = () => {
    dispatch(removeUserData());

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    navigate("/login");
  };
  // const isAuthPage =
  //   location.pathname === "/login" || location.pathname === "/registration";

  return (
    <div className={styles.headerContainer}>
      <Logo />
      <div className={styles.userContainer}>
        {isUserLoggedIn && (
          <>
            <p className={styles.userName}>{userName || "User"}</p>
            <Button
              buttonText="Logout"
              handleClick={handleLogout}
              data-testid="logout-button"
            />
          </>
        )}
        {!isUserLoggedIn && (
          <Button
            buttonText="Login"
            handleClick={() => navigate("/login")}
            data-testid="login-button"
          />
        )}
      </div>
    </div>
  );
};
