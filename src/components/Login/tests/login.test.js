import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Login } from "../Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as services from "../../../services";
import { Provider } from "react-redux";
import userReducer from "../../../store/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../../../services");

describe("Login Component Tests", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("redirects to courses if token exists", () => {
    localStorage.setItem("token", "dummy-token");
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/courses" element={<div>Courses Page</div>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Courses Page")).toBeInTheDocument();
  });

  it("shows error when fields are empty and submitted", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });

  it("displays an error on login failure", async () => {
    services.login.mockRejectedValue(new Error("Failed to login"));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(
        screen.getByText("Failed to login. Please check your credentials.")
      ).toBeInTheDocument()
    );
  });
});
