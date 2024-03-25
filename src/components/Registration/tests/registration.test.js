import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Registration } from "../Registration";
import * as services from "../../../services";

jest.mock("../../../services");

describe("Registration Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the registration form", () => {
    render(
      <Router>
        <Registration />
      </Router>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registration/i })
    ).toBeInTheDocument();
  });

  it("displays error messages for empty fields upon form submission", async () => {
    render(
      <Router>
        <Registration />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /registration/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    services.createUser.mockResolvedValueOnce({});
    render(
      <Router>
        <Registration />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /registration/i }));

    await waitFor(() => {
      expect(services.createUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
    });
  });
});
