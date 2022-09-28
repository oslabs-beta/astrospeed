//import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import OppurtunityList from "./OppurtunityList.jsx";
import lhr from "../../../lighthouse.json";
import DiagnosticList from "./DiagnosticList";

const ListContainer = () => {
  //in the json, there is a object called audits
  //the following keys in that object are possible Perofrmance opportunities
  const performanceOpportunities = [
    "render-blocking-resources",
    "uses-responsive-images",
    "offscreen-images",
    "unminified-css",
    "unminified-javascript",
    "unused-css-rules",
    "uses-optimized-images",
    "modern-image-formats",
    "uses-text-compression",
    "uses-rel-preconnect",
    "server-response-time",
    "redirects",
    "uses-rel-preload",
    "efficient-animated-content",
    "third-party-summary",
    "non-composited-animations",
    "third-party-facades",
  ];

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
  const performanceMetrics = [
    "first-contentful-paint",
    "speed-index",
    "largest-contentful-paint",
    "interactive",
    "total-blocking-time",
    "cumulative-layout-shift",
  ];

  const seoOpportunities = [];

  let opportData = [
    // { title: "Reduce unused JavaScript", score: 0.6 },
    // { title: "Preload Largest Contentful Paint image", score: 0.45 },
    // { title: "Reduce unused CSS", score: 0.15 },
  ];

  const latestAudit = Object.keys(lhr[lhr.length - 1].audits);
  let perfMetricObjects = [];
  for (let i = 0; i < performanceMetrics.length; i++) {
    perfMetricObjects.push(lhr[lhr.length - 1].audits[performanceMetrics[i]]);
  }

  let auditsRelatedToPerformance =
    lhr[lhr.length - 1].categories.performance.auditRefs; //opportunities and diagnostics
  for (let i = 0; i < performanceOpportunities.length; i++) {
    console.log(lhr[lhr.length - 1].audits[performanceOpportunities[i]]);
  }
  console.log("I AM AUDTISRELATEDTOPERMANCE...", auditsRelatedToPerformance);

  // console.log(perfMetricObjects);

  // console.log(perfMetricObjects);
  // // iterate through each audit, and
  // for (let i = 0; i < latestAudit.length; i++) {
  //   const current = lhr[lhr.length - 1].audits[latestAudit[i]];
  //   //check if lighthouse gave a low score for this metric
  //   if (
  //     current.scoreDisplayMode == "numeric" &&
  //     current.score <= lhr[0].categories.performance.score
  //   ) {
  //     //  console.log(current)
  //     //push it into opportData
  //     opportData.push(current);
  //   }
  // }
  let diaData = [
    // { title: "Reduce unused JavaScript", score: 0.6 },
    // { title: "Preload Largest Contentful Paint image", score: 0.45 },
    // { title: "Reduce unused CSS", score: 0.15 },
  ];

  // `${1+1}` // 2
  //shoe title,decscription and score. possible hover to show description
  // console.log(opportData);
  // perfMetricObjects = perfMetricObjects.map((data) => <div>{data.title}</div>);

  console.log(perfMetricObjects);
  return (
    <div>
      <div>
        <b>Important metrics:</b>
        {perfMetricObjects.map(
          (
            data //these are the important metrics
          ) => (
            <div>
              {data.title}
              <br />
              {data.description}
              <br />
              {data.displayValue}
            </div>
          )
        )}
      </div>
      <b>Opportunities:</b>
      {performanceOpportunities
        .map((metric) => lhr[lhr.length - 1].audits[metric])
        .filter((obj) => obj.score < 1 && obj.score !== null)
        .map((opportunity) => (
          <div>
            {opportunity.title}
            <br />
            {opportunity.description}
            <br />
            {opportunity.score}
          </div>
        ))}
      <div>
        {diaData.map((data) => (
          <DiagnosticList data={data} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;

//line 91
// {opportData.map((data) => (
//   <OppurtunityList data={data} />
// ))}
