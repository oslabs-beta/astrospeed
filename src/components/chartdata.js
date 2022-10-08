// export const barChartData = [

// import lhr from '../../lighthouse.json'
// import git_commits from '../../git_commits.json'
const lhr = window.results;

const perfScores = [], seoScores = [], commitNum = [], bestPracScores = [], a11yScores = [];
for (let i = 0; i < lhr.length; i++) {
  commitNum.push(i + 1);
  perfScores.push(lhr[i].categories.performance.score * 100);
  seoScores.push(lhr[i].categories.seo.score * 100);
  bestPracScores.push(lhr[i].categories['best-practices'].score * 100);
  a11yScores.push(lhr[i].categories.accessibility.score * 100);
}

export const lineChartData = [
  {
    name: "Performance",
    data: perfScores,
  },
  {
    name: "Search Engine Optimization",
    data: seoScores,
  },
  {
    name: "Best Practices",
    data: bestPracScores,
  },
  {
    name: "Accessibility",
    data: a11yScores,
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    // followCursor: false,
    theme: "dark",
    intersect: false,
    x: {
      formatter: function(val) {return `Commit #${val}<br />${lhr[Number(val) - 1].git.time}<br />${lhr[Number(val) - 1].git.msg}`}
    },
    y: {
      formatter: function(val) {return `${val}%`}
    },

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
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
    max: 100,
    min: 0,
    tickAmount: 4
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
    colors: ["#246dec", "#f5b74f", "#367952", "#cc3c43"],
  },
  colors: ["#246dec", "#f5b74f", "#367952", "#cc3c43"],
};
