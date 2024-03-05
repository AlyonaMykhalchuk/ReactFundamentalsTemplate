import React from "react";

import styles from "./styles.module.css";
import { Button } from "../../common";
import { CourseCard } from "./components";
import { useNavigate } from "react-router-dom";

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking Add New Course button.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store. Use selectors...
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.
const ADD_NEW_COURSE = "ADD NEW COURSE";
export const Courses = ({ coursesList, authorsList, handleShowCourse }) => {
  const navigate = useNavigate();

  const handleAddCourseClick = () => {
    navigate("/courses/add");
  };
  const EmptyCourseList = () => {
    return (
      <div data-testid="emptyList">
        <h2>Your List Is Empty</h2>
        <p>Please use "Add New Course" button to add your first course.</p>
        <Button
          handleClick={handleAddCourseClick}
          data-testid="addCourse"
          buttonText={ADD_NEW_COURSE}
        />
      </div>
    );
  };

  return (
    <>
      <div className={styles.panel}>
        <Button
          buttonText={ADD_NEW_COURSE}
          data-testid="addCourse"
          handleClick={handleAddCourseClick}
        />
      </div>
      {coursesList.length ? (
        coursesList.map((course) => (
          <>
            <p>course.id {course.id}</p>
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
