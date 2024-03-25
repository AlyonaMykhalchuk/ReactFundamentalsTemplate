import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import * as redux from "react-redux";
import { CourseForm } from "../CourseForm";

const mockAuthorsList = [
  { id: "1", name: "Author One" },
  { id: "2", name: "Author Two" },
];
const mockCourseAuthors = [{ id: "2", name: "Author Two" }];

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CourseForm Component Tests", () => {
  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((selector) => {
      switch (selector.name) {
        case "getAuthorsSelector":
          return mockAuthorsList;
        case "getCourseAuthorsSelector":
          return mockCourseAuthors;
        default:
          return [];
      }
    });
    redux.useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("CourseForm should show authors lists (all and course authors)", () => {
    render(
      <BrowserRouter>
        <CourseForm />
      </BrowserRouter>
    );

    expect(screen.getByText("Author One")).toBeInTheDocument();
    expect(screen.getByText("Author Two")).toBeInTheDocument();
  });

  test('CourseForm "Create author" button click should call dispatch', () => {
    const mockDispatch = jest.fn();
    redux.useDispatch.mockReturnValue(mockDispatch);

    render(
      <BrowserRouter>
        <CourseForm />
      </BrowserRouter>
    );

    const createAuthorButton = screen.getByText("Create author");
    fireEvent.click(createAuthorButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
