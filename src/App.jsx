import React, { useCallback, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "./App.module.css";
import {
  CourseForm,
  CourseInfo,
  Courses,
  Header,
  Login,
  PrivateRoute,
  Registration,
} from "./components";
import { useDispatch } from "react-redux";
import { getAuthorsThunk } from "./store/thunks/authorsThunk";
import { getCoursesThunk } from "./store/thunks/coursesThunk";
import { getUserThunk } from "./store/thunks/userThunk";

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserThunk());
    }
  }, [dispatch, token]);
  const fetchInitData = useCallback(() => {
    dispatch(getCoursesThunk());
    dispatch(getAuthorsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchInitData();
  }, [fetchInitData]);
  // useEffect(() => {
  //   if (token) {
  //     // if (location.pathname === "/" || location.pathname === "/login") {
  //     navigate("/courses");
  //   }
  //   // }
  // }, [token]);

  const handleShowCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route
            path="/courses"
            element={<Courses handleShowCourse={handleShowCourse} />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses/add"
            element={
              <PrivateRoute>
                <CourseForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/update/:courseId"
            element={
              <PrivateRoute>
                <CourseForm />
              </PrivateRoute>
            }
          />
          <Route path="/courses/:courseId" element={<CourseInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
