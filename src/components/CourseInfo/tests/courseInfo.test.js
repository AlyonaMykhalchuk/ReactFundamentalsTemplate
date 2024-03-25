import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CourseInfo } from "../CourseInfo";
import { formatCreationDate, getCourseDuration } from "../../../helpers";

jest.mock("../../../helpers", () => ({
  getCourseDuration: jest.fn(),
  formatCreationDate: jest.fn(),
}));
const mockStore = configureStore([]);

describe("CourseInfo Component Tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      courses: [
        {
          id: "1",
          title: "Test Course",
          description: "This is a test course",
          duration: 30,
          authors: ["author1", "author2"],
          creationDate: "10/10/2020",
        },
      ],
      authors: [
        {
          id: "author1",
          name: "Author One",
        },
        {
          id: "author2",
          name: "Author Two",
        },
      ],
    });
  });

  beforeEach(() => {
    getCourseDuration.mockReturnValue("00:30 hours");
    formatCreationDate.mockReturnValue("10.10.2020");
  });

  it("renders course information", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/1"]}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseInfo />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(screen.getByText("This is a test course")).toBeInTheDocument();
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Author One")).toBeInTheDocument();
    expect(screen.getByText("Author Two")).toBeInTheDocument();
  });

  test("back link navigates to courses list", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/courses/1"]}>
          <CourseInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("BACK").closest("a")).toHaveAttribute(
      "href",
      "/courses"
    );
  });
});
