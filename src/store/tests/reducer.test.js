import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getAuthors } from "../../services";
import { authorsSlice, setAuthors, saveAuthor } from "../slices/authorsSlice";
import { coursesSlice, setCourses } from "../slices/coursesSlice";
import { userSlice, setUserData, removeUserData } from "../slices/userSlice";
import { getAuthorsThunk } from "../thunks/authorsThunk";

jest.mock("../../services");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux: Authors Slice", () => {
  test("setAuthors action", () => {
    const initialState = [];
    const expectedAuthors = [{ id: "1", name: "Author One" }];
    expect(
      authorsSlice.reducer(initialState, setAuthors(expectedAuthors))
    ).toEqual(expectedAuthors);
  });

  test("saveAuthor action", () => {
    const initialState = [{ id: "1", name: "Author One" }];
    const newAuthor = { id: "2", name: "Author Two" };
    expect(authorsSlice.reducer(initialState, saveAuthor(newAuthor))).toEqual([
      ...initialState,
      newAuthor,
    ]);
  });
});

describe("Redux: Courses Slice", () => {
  test("setCourses action", () => {
    const initialState = [];
    const expectedCourses = [{ id: "1", title: "Course 1" }];
    expect(
      coursesSlice.reducer(initialState, setCourses(expectedCourses))
    ).toEqual(expectedCourses);
  });
});

describe("Redux: User Slice", () => {
  test("setUserData action", () => {
    const initialState = {
      isAuth: false,
      name: "",
      email: "",
      token: "",
      role: "",
    };
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      token: "token123",
      role: "admin",
    };
    expect(userSlice.reducer(initialState, setUserData(userData))).toEqual({
      ...initialState,
      ...userData,
      isAuth: true,
    });
  });

  test("removeUserData action", () => {
    const initialState = {
      isAuth: true,
      name: "John Doe",
      email: "john@example.com",
      token: "token123",
      role: "admin",
    };
    expect(userSlice.reducer(initialState, removeUserData())).toEqual({
      isAuth: false,
      name: "",
      email: "",
      token: "",
      role: "",
    });
  });
});

describe("getAuthorsThunk", () => {
  it("dispatches setAuthors after fetching authors", async () => {
    const store = mockStore({ authors: [] });
    getAuthors.mockResolvedValueOnce({
      result: [{ id: "1", name: "Author One" }],
    });

    await store.dispatch(getAuthorsThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(setAuthors([{ id: "1", name: "Author One" }]));
  });
});
