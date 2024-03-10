import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";

export const CreateAuthor = ({ createAuthor }) => {
  const [authorName, setAuthorName] = useState("");

  const handleCreateAuthor = () => {
    if (authorName.trim()) {
      createAuthor(authorName);
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
