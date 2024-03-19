// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * add functionality to create new course with:
//   ** title
//   ** description
//   ** duration (user enters in minutes, you should map in format «hh:mm»)
//   ** existing authors (use 'authorsList' prop)
//   ** new created author (create field and button, update 'authorsList')
//   ** user should be able to remove author from the course
//   ** add validation to the fields
//   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-2/home-task/components#add-new-course

// Module 3.
// * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-3/home-task/components#add-new-course

// Module 4.
// * render this component only for ADMIN user
// * in this module you should separate functionality for this component:
//   ** create mode:
//     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
//     * make a request to save new course
//     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
//     * save new course to the store after success response
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#add-new-course
//   ** update mode:
//     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
//     * appropriate forms field should be prefilled with course's info
//     * user should have ability to modify course information in the fields and change authors list
//     * make a request to save updated course
//     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     save updated course to the store after success response.
// ** TASK DESCRIPTION ** - https://d17btkcdsmqrmh.cloudfront.net/new-react-fundamentals/docs/module-4/home-task/components#update-course

// Module 5:
// * proposed cases for unit tests:
//   ** CourseForm should show authors lists (all and course authors).
//   **  CourseForm 'Create author' button click should call dispatch.
//   **  CourseForm 'Add author' button click should add an author to the course authors list.
//   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Button, Input } from "../../common";
import { AuthorItem, CreateAuthor } from "./components";
import { getCourseDuration } from "../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserRoleSelector } from "../../store/selectors";
import {
  createCourseThunk,
  updateCourseThunk,
} from "../../store/thunks/coursesThunk";

export const CourseForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const userRole = useSelector(getUserRoleSelector);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [authorsList] = useState([]);

  const handleAddAuthorToCourse = (authorId) => {
    const authorToAdd = authorsList.find((author) => author.id === authorId);
    if (authorToAdd) {
      setCourseAuthors([...courseAuthors, authorToAdd]);
    }
  };

  const handleRemoveAuthorFromCourse = (authorId) => {
    setCourseAuthors(courseAuthors.filter((author) => author.id !== authorId));
  };
  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/courses");
    }
  }, [navigate, userRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      title,
      description,
      duration: Number(duration),
      authors: courseAuthors.map((author) => author.id),
    };

    if (courseId) {
      dispatch(updateCourseThunk(courseId, courseData));
    } else {
      dispatch(createCourseThunk(courseData));
    }

    navigate("/courses");
  };

  return (
    <div className={styles.container}>
      <h2>{title ? "Course Edit" : "Create Page"}</h2>

      <form onSubmit={handleSubmit}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          data-testid="titleInput"
          labelText="Title"
        />
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.description}
            data-testid="descriptionTextArea"
          />
        </label>
        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration in minutes"
                data-testid="durationInput"
                labelText="Duration in minutes"
              />
              <p>{getCourseDuration(duration)}</p>
            </div>
            <h2>Authors</h2>
            <CreateAuthor />
            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>
              {authorsList.map((author) => (
                <AuthorItem
                  key={author.id}
                  author={author}
                  onAction={() => handleAddAuthorToCourse(author.id)}
                />
              ))}
            </div>
          </div>
          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {courseAuthors.length ? (
              courseAuthors.map((author) => (
                <AuthorItem
                  key={author.id}
                  author={author}
                  onRemove={() => handleRemoveAuthorFromCourse(author.id)}
                />
              ))
            ) : (
              <p className={styles.notification}>List is empty</p>
            )}
          </div>
        </div>
      </form>
      <div className={styles.buttonsContainer}>
        <Button
          data-testid="createCourseButton"
          type="submit"
          buttonText={courseId ? "UPDATE COURSE" : "CREATE COURSE"}
        />
        <Button buttonText="Cancel" handleClick={() => navigate("/courses")} />
      </div>
    </div>
  );
};
