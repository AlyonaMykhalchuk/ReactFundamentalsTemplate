import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { createAuthorThunk } from "../../../../store/thunks/authorsThunk";
import { useDispatch } from "react-redux";

export const CreateAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const dispatch = useDispatch();

  const handleCreateAuthor = () => {
    console.log("Author=", authorName);
    if (authorName.trim()) {
      dispatch(createAuthorThunk(authorName));
      setAuthorName("");
    }
  };

  return (
    <div className={styles.newAuthorContainer}>
      <h2>Add author</h2>
      <Input
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Author's name"
        data-testid="createAuthorInput"
      />
      <Button
        buttonText="Create author"
        handleClick={handleCreateAuthor}
        data-testid="createAuthorButton"
      />
    </div>
  );
};
