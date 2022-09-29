import React, { useState } from "react";
import styles from "./styles.module.css";

const OppurtunityItem = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`${styles.inputInsideContainer} ${
        data.score > 0.97 ? styles.green : styles.red
      }`}
    >
      <div onClick={handleClick} className={styles.arrow}></div>
      <div className={styles.mainItem}>
        <div className={styles.dataTitle}>{data.title}</div>
        <div className={styles.blinking}>{data.displayValue}</div>
      </div>

      {open && (
        <div className={styles.bottomData}>
          <div className={styles.description}>{data.description}</div>
          <div>{data.score}</div>
        </div>
      )}
    </div>
  );
};

export default OppurtunityItem;
