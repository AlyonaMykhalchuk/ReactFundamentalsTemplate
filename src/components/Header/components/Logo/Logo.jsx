import React from "react";
import logo from "../../../../assets/logo.svg";
import styles from "./styles.module.css";

// Module 1:
// * add logo.svg as a logo image
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#logo-component

export const Logo = () => <img src={logo} className={styles.logo} alt="logo" />;
