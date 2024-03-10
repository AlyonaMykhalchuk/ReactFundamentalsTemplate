// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-219&mode=design&t=0FIG0iRzKcD0s16M-0
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/file/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?type=design&node-id=2932-257&mode=design&t=0FIG0iRzKcD0s16M-0
// * render this component by route '/registration'
// * submit form data and make POST API request '/registration'.
// * after successful registration navigates to '/login' route.
// * component should have a link to the Login page (see design)
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#registration-new-component

import React, { useState } from "react";

import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../common";
import { createUser } from "../../services";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, apiError: undefined });
    if (!validateForm()) return;
    try {
      const data = { name, email, password };
      await createUser(data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            labelText="Name"
            // You might need to pass additional props for error display
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            labelText="Email"
            // Additional props as needed
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            labelText="Password"
            // Additional props as needed
          />
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
          <Button buttonText="Registration" type="submit" />
        </form>
        <p>
          If you have an account you may&nbsp; <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
