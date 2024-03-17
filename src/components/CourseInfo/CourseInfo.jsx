// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";

import { formatCreationDate, getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthorsSelector, getCoursesSelector } from "../../store/selectors";

export const CourseInfo = () => {
  const { courseId } = useParams();
  const coursesList = useSelector(getCoursesSelector);
  const authorsList = useSelector(getAuthorsSelector);
  const course = coursesList.find((course) => course.id === courseId);
  const courseAuthors = course?.authors
    .map(
      (authorId) => authorsList.find((author) => author.id === authorId)?.name
    )
    .filter(Boolean);
  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{course?.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{course?.description}</p>
        <div>
          <p>
            <b>ID: {courseId}</b>
          </p>
          <p>
            <b>Duration: </b>
            {getCourseDuration(course?.duration)}
          </p>
          <p>
            <b>Created: </b>
            {formatCreationDate(course?.creationDate)}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              {courseAuthors.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Link to="/courses" className={styles.backButton}>
        BACK
      </Link>
    </div>
  );
};
