import React from "react";

import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const AuthorItem = ({ author, onAction, actionLabel }) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{author.name}</span>
    <Button
      buttonText={actionLabel}
      handleClick={() => onAction(author.id)}
      data-testid="actionAuthor"
    />
  </div>
);
