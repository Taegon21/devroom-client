import React from "react";
import styles from "./HelpFilter.module.css";

interface FilterProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

const HelpFilter = ({ onViewChange, currentView }: FilterProps) => {
  return (
    <div className={styles.filter}>
      <button
        className={`${styles.button} ${
          currentView === "column" ? styles.active : ""
        }`}
        onClick={() => onViewChange("column")}
      >
        Column View
      </button>
      <button
        className={`${styles.button} ${
          currentView === "grid" ? styles.active : ""
        }`}
        onClick={() => onViewChange("grid")}
      >
        Grid View
      </button>
    </div>
  );
};

export default HelpFilter;
