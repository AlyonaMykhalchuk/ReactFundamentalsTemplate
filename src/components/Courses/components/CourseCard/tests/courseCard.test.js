import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";
import { CourseCard } from "../CourseCard";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { formatCreationDate, getCourseDuration } from "../../../../../helpers";

// Mock the helpers
jest.mock("../../../../../helpers", () => ({
  getCourseDuration: jest.fn().mockReturnValue("00:30 hours"),
  formatCreationDate: jest.fn().mockReturnValue("9/3/2021"),
}));

const mockReducer = () => ({
  // Mock the initial state expected by your component
  user: {
    role: "admin",
  },
});

const mockStore = createStore(mockReducer);
// Sample course data for testing
const course = {
  id: "1",
  title: "Test Course",
  description: "This is a test description of the course.",
  duration: 90, // in minutes
  creationDate: "9/3/2021",
  authors: ["1", "2"],
};

const authorsList = [
  { id: "1", name: "Author One" },
  { id: "2", name: "Author Two" },
];

const renderCourseCard = () =>
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <CourseCard
          course={course}
          authorsList={authorsList}
          handleShowCourse={() => {}}
        />
      </BrowserRouter>
    </Provider>
  );

describe("CourseCard", () => {
  it("should display title", () => {
    renderCourseCard();
    expect(screen.getByText(course.title)).toBeInTheDocument();
  });

  it("should display description", () => {
    renderCourseCard();
    expect(screen.getByText(course.description)).toBeInTheDocument();
  });
  test("renders duration and created date spans", () => {
    renderCourseCard();
    const durationSpan = screen.getByText("Duration:").nextSibling;
    const createdSpan = screen.getByText("Created:").nextSibling;
    expect(durationSpan).toBeInTheDocument();
    expect(createdSpan).toBeInTheDocument();
  });

  it("calls getCourseDuration with the correct duration", () => {
    renderCourseCard();
    expect(getCourseDuration).toHaveBeenCalledWith(course.duration);
  });
  it("should display authors list", () => {
    renderCourseCard();
    expect(screen.getByText("Author One, Author Two")).toBeInTheDocument();
  });

  it("calls getCourseDuration with the correct duration", () => {
    renderCourseCard();
    expect(formatCreationDate).toHaveBeenCalledWith(course.creationDate);
  });
});
