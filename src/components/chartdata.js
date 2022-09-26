// export const barChartData = [

import lhr from '../../lighthouse.json'

const perfScores = [], seoScores = [], commitNum = [];
for (let i = 0; i < lhr.length; i++) {
  commitNum.push(i + 1);
  perfScores.push(lhr[i].categories.performance.score * 100);
  seoScores.push(lhr[i].categories.seo.score * 100);
}

export const lineChartData = [
  {
    name: "Performance Score",
    data: perfScores,
  },
  {
    name: "SEO Score",
    data: seoScores,
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "straight",
  },
  xaxis: {
    type: "numeric",
    categories: commitNum,
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
    title: {text:"Commit #"},
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
    max: 100,
  },
  legend: {
    show: true,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#4FD1C5", "#2D3748"],
  },
  colors: ["#4FD1C5", "#2D3748"],
};
