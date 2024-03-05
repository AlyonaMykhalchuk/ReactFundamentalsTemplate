// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2927-216&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-191&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/login'
// * use login service to submit form data and make POST API request '/login'.
// * component should have a link to the Registration page (see design)
// * save token from API after success login to localStorage.
// ** PAY ATTATION ** token should be saved to localStorage inside login handler function after login service responce
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#login-new-component

// Module 3.
// * save user's name, token and email to the store after success login.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#login-component

import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services";
import { Button, Input } from "../../common";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/courses");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const token = await login({ email, password });
      localStorage.setItem("token", token);
      navigate("/courses");
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            labelText="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            labelText="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button buttonText="Login" />
          {error && <div className={styles.error}>{error}</div>}
        </form>
        <p>If you don't have an account you may&nbsp;</p>
        <Link to="/registration">Registration</Link>
      </div>
    </div>
  );
};
