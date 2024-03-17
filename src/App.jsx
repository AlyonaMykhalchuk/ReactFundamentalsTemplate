import React, { useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import {
  CourseForm,
  CourseInfo,
  Courses,
  Header,
  Login,
  Registration,
} from "./components";
import { useDispatch } from "react-redux";
import { getAuthors, getCourses } from "./services";
import { setCourses } from "./store/slices/coursesSlice";
import { setAuthors } from "./store/slices/authorsSlice";

// Module 3:
// * wrap your App with Redux Provider in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchInitData = useCallback(async () => {
    const courses = await getCourses();
    console.log("courses", courses);
    dispatch(setCourses(courses.result));
    const authors = await getAuthors();
    dispatch(setAuthors(authors.result));
  }, [dispatch]);

  useEffect(() => {
    fetchInitData();
  }, [fetchInitData]);
  useEffect(() => {
    if (token) {
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/courses");
      }
    }
  }, [token, navigate, location.pathname]);

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
          <Route path="/courses/add" element={<CourseForm />} />
          <Route path="/courses/:courseId" element={<CourseInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
