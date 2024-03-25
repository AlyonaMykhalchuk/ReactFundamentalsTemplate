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

const ADD_NEW_COURSE = "ADD NEW COURSE";
export const Courses = ({ handleShowCourse }) => {
  const navigate = useNavigate();
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);

  const userRole = useSelector(getUserRoleSelector);
  const handleAddCourseClick = () => {
    if (userRole === "admin") {
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
          <CourseCard
            key={course.id}
            course={course}
            authorsList={authorsList}
            handleShowCourse={handleShowCourse}
          />
        ))
      ) : (
        <div data-testid="emptyContainer">
          <EmptyCourseList />
        </div>
      )}
    </>
  );
};
