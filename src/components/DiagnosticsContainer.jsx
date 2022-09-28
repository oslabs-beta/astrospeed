import React from "react";
import lhr from '../../lighthouse.json'


class DiagnosticsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    // this.setState({
    //   chartData: lineChartData,
    //   chartOptions: lineChartOptions,
    // });
  }

  render() {
    const performanceOpportunities = new Set(['render-blocking-resources', 'uses-responsive-images', 'offscreen-images', 'unminified-css', 'unminified-javascript', 'unused-css-rules', 'uses-optimized-images', 'uses-webp-images', 'uses-text-compression', 'uses-rel-preconnect', 'time-to-first-byte', 'redirects', 'uses-rel-preload', 'efficient-animated-content', 'third-party-summary', 'non-composited-animations', 'third-party-facades'])


    let result = [];
    let audits = Object.keys(lhr[0].audits);
    for (let i = 0; i < audits.length; i++) {
      const current = lhr[0].audits[audits[i]];
      if (current.scoreDisplayMode == "numeric" && current.score <= lhr[0].categories.performance.score) {
        let myItem = <div>{current.title}<br />{current.description}<br /><br /></div>
        result.push(myItem)
      }
    }
    // result.map(el => el)
    // let output = result.map(El => <div>El</div>)
    // console.log(result.length)
    return (
      <>
      <div>{result}</div>
      {/* <div>{buffer}</div> */}
      </>
    );
  }
}

export default DiagnosticsContainer;
