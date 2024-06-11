// ToggleButton.js
import React from "react";
import SunIcon from "/public/icons/Sun.svg";
import MoonIcon from "/public/icons/Moon.svg";
import styles from "./ToggleButton.module.css";

interface ToggleButtonProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ToggleButton = ({ darkMode, toggleDarkMode }: ToggleButtonProps) => {
  return (
    <div className={styles.toggleButtonContainer}>
      <button
        className={`${styles.toggleButton} ${darkMode ? styles.darkMode : ""}`}
        onClick={toggleDarkMode}
      >
        <MoonIcon
          className={`${styles.moonIcon} ${
            darkMode ? styles.visible : styles.hidden
          }`}
        />
        <SunIcon
          className={`${styles.sunIcon} ${
            darkMode ? styles.hidden : styles.visible
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleButton;
