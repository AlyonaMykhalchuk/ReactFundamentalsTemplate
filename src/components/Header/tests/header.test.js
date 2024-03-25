import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockStore = {
  user: {
    isAuth: false,
    name: "",
  },
};

const renderWithProviders = (ui, { reduxState = {} } = {}) => {
  const store = {
    getState: () => reduxState,
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };
  return render(<Provider store={store}>{ui}</Provider>, {
    wrapper: BrowserRouter,
  });
};
beforeEach(() => {
  useSelector.mockImplementation((callback) => {
    return callback(mockStore);
  });
});
describe("Header Component", () => {
  test("renders login button when user is not logged in", () => {
    renderWithProviders(<Header />, { reduxState: mockStore });
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
  test("always renders the logo", () => {
    renderWithProviders(<Header />, { reduxState: mockStore });
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  test("renders user's name when logged in", () => {
    const loggedInState = {
      user: {
        isAuth: true,
        name: "test",
      },
    };

    useSelector.mockImplementation((callback) => {
      return callback(loggedInState);
    });

    renderWithProviders(<Header />);

    const userName = screen.queryByText("test");
    expect(userName).toBeInTheDocument();
  });
});
