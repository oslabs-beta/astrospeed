import React, { useState } from "react";
import styles from "./styles.module.css";

const DiagnosticsItem = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // console.log('diag item', data.link)
  return (
    <div
    onClick={handleClick}
      className={`${styles.inputInsideContainer} ${
        data.score > 0.96 ? styles.green : styles.red
      }`}
    >
      <div  className={styles.arrow}></div>
      <div className={styles.mainItem}>
        <div className={styles.dataTitle}>{data.title}</div>
        <div>{data.displayValue || String(data.score * 100) + '%' }</div>
      </div>

      {open && (
        <div className={styles.bottomData}>
          <div className={styles.description}>{data.description}{data.link && (<a target="_blank" href={data.link[0]}>Learn More</a>)}</div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticsItem;
