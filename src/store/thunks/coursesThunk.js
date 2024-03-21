// export const updateCourseThunk = () => {};

// export const deleteCourseThunk = () => {};

// export const createCourseThunk = () => {};

import {
  createCourse,
  deleteCourseService,
  getCourses,
  updateCourseService,
} from "../../services";
import {
  deleteCourse,
  saveCourse,
  setCourses,
  updateCourse,
} from "../slices/coursesSlice";

export const getCoursesThunk = () => async (dispatch) => {
  try {
    const courses = await getCourses();
    console.log("courses", courses.result);
    dispatch(setCourses(courses.result));
  } catch (error) {
    console.log("ERROR=", error);
  }
};
export const createCourseThunk = (courseData) => async (dispatch) => {
  try {
    const newCourse = await createCourse(courseData);
    dispatch(saveCourse(newCourse)); // Assuming saveCourse updates your store appropriately
  } catch (error) {
    console.error("Error creating course:", error);
  }
};

export const updateCourseThunk = (courseData) => async (dispatch) => {
  try {
    const newCourse = await updateCourseService(courseData);
    dispatch(updateCourse(newCourse)); // Assuming saveCourse updates your store appropriately
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

export const deleteCourseThunk = (courseData) => async (dispatch) => {
  try {
    const newCourse = await deleteCourseService(courseData);
    dispatch(deleteCourse(newCourse)); // Assuming saveCourse updates your store appropriately
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};
