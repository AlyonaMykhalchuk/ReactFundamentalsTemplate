import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services";
import { Button, Input } from "../../common";
import { setUserData } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const { token, user } = await login({ email, password });
      localStorage.setItem("token", token);
      dispatch(
        setUserData({
          name: user.name,
          email: user.email,
          token: token,
        })
      );
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
        <p>
          If you don't have an account you may&nbsp;
          <Link to="/registration">Registration</Link>
        </p>
      </div>
    </div>
  );
};
