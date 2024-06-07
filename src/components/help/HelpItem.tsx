import React from "react";
import styles from "./HelpItem.module.css";

interface HelpItemProps {
  title: string;
  body: string;
  category: string;
}

const HelpItem = ({ title, body, category }: HelpItemProps) => {
  return (
    <div className={styles.helpItem}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
      <span className={styles.category}>{category}</span>
    </div>
  );
};

export default HelpItem;
