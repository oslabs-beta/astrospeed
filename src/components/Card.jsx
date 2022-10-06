import React from "react";
import DialChart from "./DialChart";

export default function Card (props) {
    const { name, data } = props;
    return (
      <div className="card">
      <div className="card-inner">
          <p className="text-primary">{ name } SCORE</p>
          <span className="material-symbols-outlined text-blue">bolt</span>
      </div>
      <DialChart name={ name } data = { data }/>
      <span className="text-primary font-weight-bold">{ data }</span>
     </div>
  )
}