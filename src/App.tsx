
import React, { useState } from 'react';
const lhr = (window as any).results;
import ListContainer from "./components/ListContainer/ListContainer.jsx" 
import LineChart from "./components/LineChart.jsx";
import DialChart from "./components/DialChart.jsx";
import Card from "./components/Card.jsx"

// interface Props {
//    currentMetric: string
// }

class App extends React.Component<{}, {currentMetric: string, currentEndpoint: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentMetric: 'performance',
      currentEndpoint: Object.keys(lhr)[0]
    };
  }
  render() {
    // const [currentMetric, setcurrentMetric] = useState('Performance');

    const reportTime = lhr[this.state.currentEndpoint][lhr[this.state.currentEndpoint].length - 1].git.time;
    const currPerf = lhr[this.state.currentEndpoint][lhr[this.state.currentEndpoint].length-1].categories.performance.score * 100
    const currSeo = lhr[this.state.currentEndpoint][lhr[this.state.currentEndpoint].length-1].categories.seo.score * 100;
    const currBP = lhr[this.state.currentEndpoint][lhr[this.state.currentEndpoint].length-1].categories['best-practices'].score * 100;
    const currAcc = lhr[this.state.currentEndpoint][lhr[this.state.currentEndpoint].length-1].categories.accessibility.score * 100;

    const divStyle = {
      display:'flex'
    }

    const availableEndpoints = Object.keys(lhr).map(endpoint => <li key={endpoint} className="endpoint" onClick={() => this.setState({currentEndpoint: endpoint})}>{endpoint}</li>)

    return (
      <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="grid-container">
{/* <!-- sidebar --> */}
<aside id="sidebar">
    <div className="sidebar-title">
        <div className="sidebar-brand">
          <span className="material-symbols-outlined">rocket</span>astroSpeed
        </div>
        {/* <!-- open & close based on click of X --> */}
        <span className="material-symbols-outlined">close</span>
     </div>

     <ul className="sidebar-list">
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">expand_more</span>Endpoints
        </li>
        {availableEndpoints}
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">help</span> Documentation
        </li>
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">rocket_launch</span> astroSpeed Login
        </li>
     </ul>
</aside>

{/* <!-- main --> */}
<main className="main-container">
    <div className="main-title">
        <p className="font-weight-bold">Overview</p>
        {/* <span className='timestamp'>{reportTime}</span> */}
    </div>

    <div className="main-cards">
       <Card 
       name='Performance'
       icon='bolt'
       diagnosticsState={() => this.setState({currentMetric: 'performance'})}
       data={currPerf} 
       />
      <Card 
       name='SEO'
       icon='data_thresholding'
       diagnosticsState={() => this.setState({currentMetric: 'seo'})}
      //  onClick={() => this.setState({currentMetric: 'seo'})}
       data={currSeo} 
       />
      <Card 
       name={'Best Practices'}
       icon='heart_plus'
       diagnosticsState={() => this.setState({currentMetric: 'best-practices'})}
       data={currBP} 
       />
      <Card 
       name={'Accessibility'}
       icon='settings_accessibility'
       diagnosticsState={() => this.setState({currentMetric: 'accessibility'})}
       data={currAcc} 
       />
    </div>

    <div className="main-title">
        <p className="font-weight-bold">Details & Diagnostics</p>
    </div>

    <div className="charts">
        <div className="charts-card">
            <p className="chart-title">Web Vitals</p>
            <div id="area-chart">
            <LineChart currentEndpoint={this.state.currentEndpoint} />
            </div>
        </div>

        <div className="recommendations">
            <p className="chart-title">Details</p>
            <div id="bar-chart">
            <ListContainer currentEndpoint={this.state.currentEndpoint} currentMetric={this.state.currentMetric}/>
            </div>
        </div>

    </div>
    Report generated at: {reportTime} <br />

</main>

</div>
        
        </>
    )

    // // const {fetchTime} = lhr[lhr.length-1];
    // // const reportDate = new Date(fetchTime.slice(0, -1));
    // const reportTime = git_commits[git_commits.length - 1][1]
    // return (
    //   <>
    //     {/* <h1>
    //       Hello {name}
    //     </h1> */}
    //     Report generated at: {reportTime} <br />
    //     Performance: {lhr[lhr.length-1].categories.performance.score}  <br />
    //     Search Engine Optimization (SEO): {lhr[lhr.length-1].categories.seo.score}  <br />

    //   </>
    // );
  }
}

export default App;
