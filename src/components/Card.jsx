import React from "react";
import DialChart from "./DialChart";

export default function Card (props) {
    const { name, data, icon, diagnosticsState } = props;
    return (
      <div className="card" onClick={diagnosticsState}>
      <div className="card-inner">
          <p className="text-primary">{name}</p>
          <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      {/* <DialChart name={name} data = {data}/> */}
      <span className="text-primary font-weight-bold">{ data }</span>
     </div>
  )
}