import React from "react";

import styles from "./styles.module.css";
import { Button } from "../../common";
import { CourseCard } from "./components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAuthorsSelector,
  getCoursesSelector,
  getUserRoleSelector,
} from "../../store/selectors";

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.
const ADD_NEW_COURSE = "ADD NEW COURSE";
export const Courses = ({ handleShowCourse }) => {
  const navigate = useNavigate();
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);

  const userRole = useSelector(getUserRoleSelector);
  console.log("userRole=", userRole);
  const handleAddCourseClick = () => {
    if (userRole === "admin") {
      console.log("navigate");
      navigate("/courses/add");
    }
  };
  const EmptyCourseList = () => {
    return (
      <div data-testid="emptyList">
        <h2>Your List Is Empty</h2>
        <p>Please use "Add New Course" button to add your first course.</p>
        {userRole === "admin" && (
          <Button
            handleClick={handleAddCourseClick}
            data-testid="addCourse"
            buttonText={ADD_NEW_COURSE}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {userRole === "admin" && (
        <div className={styles.panel}>
          <Button
            buttonText={ADD_NEW_COURSE}
            data-testid="addCourse"
            handleClick={handleAddCourseClick}
          />
        </div>
      )}
      {coursesList.length ? (
        coursesList.map((course) => (
          <>
            <CourseCard
              key={course.id}
              course={course}
              authorsList={authorsList}
              handleShowCourse={handleShowCourse}
            />
          </>
        ))
      ) : (
        <div data-testid="emptyContainer">
          <EmptyCourseList />
        </div>
      )}
    </>
  );
};
