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
    // style: {colors:  [ "#E4E684", "#3700A4"]}//['#FFFFFF', '#000000']}
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
    // tickAmount: 5
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
    colors: ["#3700A4", "#facc15"],
  },
  colors: ["#3700A4", "#facc15"],
};
