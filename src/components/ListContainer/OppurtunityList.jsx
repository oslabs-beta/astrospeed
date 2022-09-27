import React from "react";
import styles from "./styles.module.css";

const OppurtunityList = (props) => {
  return (
    <div className={styles.lists}>
      <div>{props.data.title}</div>
      <div>{props.data.score}</div>
      <div></div>
    </div>
  );
};

export default OppurtunityList;
