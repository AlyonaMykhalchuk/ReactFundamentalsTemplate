import { createAuthor, getAuthors } from "../../services";
import { saveAuthor, setAuthors } from "../slices/authorsSlice";

export const getAuthorsThunk = () => async (dispatch) => {
  try {
    const authors = await getAuthors();
    dispatch(setAuthors(authors.result));
  } catch (error) {
    console.log("ERROR=", error);
  }
};
export const createAuthorThunk = (authorData) => async (dispatch) => {
  try {
    const authorDataNew = await createAuthor(authorData);
    dispatch(saveAuthor(authorDataNew));
  } catch (error) {
    console.log("ERROR=", error);
  }
};
