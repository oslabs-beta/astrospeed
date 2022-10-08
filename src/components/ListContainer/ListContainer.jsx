//import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
// import OppurtunityItem from "./OppurtunityItem.jsx";
const lhr = window.results;
import DiagnosticsItem from "./DiagnosticsItem";
import styles from "./styles.module.css";

const ListContainer = (props) => {
  /*
  Performance breakdown
      Audit	Weight
      First Contentful Paint	10%
      Speed Index	10%
      Largest Contentful Paint	25%
      Time to Interactive	10%
      Total Blocking Time	30%
      Cumulative Layout Shift	15%
  */
  const diagnostics = {};
  for (const category of Object.keys(lhr[lhr.length - 1]['categories'])) {
    const refs = lhr[lhr.length - 1]['categories'][category]['auditRefs'];
    diagnostics[category] = refs.map(ref => {
      const fullAudit = lhr[lhr.length - 1]['audits'][ref.id];
      if (!fullAudit.score) return null
      fullAudit.link = fullAudit.description.match(/https:\/\/web.dev.*\//);
      fullAudit.description = fullAudit.description.replace(/\[Learn.*/, '')
      return fullAudit
    }).filter(ref => ref).sort((a, z) => a.score - z.score);
  };
  console.log(diagnostics)
 
  return (

        <div>
          {diagnostics[props.currentMetric].map((data) => (
            <DiagnosticsItem data={data} key={data.id} />
          ))}
        </div>

  );
};

export default ListContainer;

//line 91
// {opportData.map((data) => (
//   <OppurtunityList data={data} />
// ))}
