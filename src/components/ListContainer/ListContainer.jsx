//import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import OppurtunityItem from "./OppurtunityItem.jsx";
const lhr = window.results;
import DiagnosticsItem from "./DiagnosticsItem";
import styles from "../../components/ListContainer/styles.module.css";

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
    console.log(
      "I AM LINE 67...",
      lhr[lhr.length - 1].audits[performanceOpportunities[i]]
    );
  }
  console.log("I AM AUDTISRELATEDTOPERMANCE...", auditsRelatedToPerformance);

  let diaData = [
    // { title: "Reduce unused JavaScript", score: 0.6 },
    // { title: "Preload Largest Contentful Paint image", score: 0.45 },
    // { title: "Reduce unused CSS", score: 0.15 },
  ];

  console.log("I AM 77...", perfMetricObjects);

  return (
    <div>
      <h3>Important metrics:</h3>
      <div>
        <h4>Your Opportunities:</h4>
        <div>
          {perfMetricObjects.map((data) => (
            <OppurtunityItem data={data} key={data.id} />
          ))}
        </div>
      </div>
      <div>
        <h4>Your Diagnostics:</h4>
        <div>
          {perfMetricObjects.map((data) => (
            <DiagnosticsItem data={data} key={data.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListContainer;

//line 91
// {opportData.map((data) => (
//   <OppurtunityList data={data} />
// ))}