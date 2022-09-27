import React from "react";
//import styles from "./styles.module.css";

const DiagnosticList = (props) => {
  return (
    <div>
      <div>{props.data.score}</div>
      <div></div>
    </div>
  );
};

export default DiagnosticList;
