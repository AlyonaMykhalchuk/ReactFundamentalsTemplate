import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter, useNavigate } from "react-router-dom";
import * as redux from "react-redux";
import { Courses } from "../Courses";

const mockCourses = [
  {
    id: "1",
    title: "Course 1",
    description: "Description 1",
    authors: [],
    duration: 1,
    creationDate: "",
  },
  {
    id: "2",
    title: "Course 2",
    description: "Description 2",
    authors: [],
    duration: 2,
    creationDate: "",
  },
  // Add more courses as needed for testing
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("Courses Component", () => {
  beforeEach(() => {
    redux.useSelector.mockImplementation((selector) => {
      if (selector.name === "getCoursesSelector") return mockCourses;
      if (selector.name === "getAuthorsSelector") return [];
      if (selector.name === "getUserRoleSelector") return "admin";
    });
    jest.mocked(useNavigate).mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display amount of CourseCard equal length of courses array", () => {
    render(
      <BrowserRouter>
        <Courses handleShowCourse={() => {}} />
      </BrowserRouter>
    );
    const courseCards = screen.getAllByTestId("courseCard");
    expect(courseCards.length).toBe(mockCourses.length);
  });
  test('CourseForm should be shown after a click on the "Add new course" button', () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Courses handleShowCourse={() => {}} />
      </BrowserRouter>
    );

    const addCourseButton = screen.getByTestId("addCourse");
    fireEvent.click(addCourseButton);

    expect(mockNavigate).toHaveBeenCalledWith("/courses/add");
  });
});
