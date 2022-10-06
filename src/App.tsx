
import * as React from 'react';
const lhr = (window as any).results;
import ListContainer from "./components/ListContainer/ListContainer.jsx" 
import LineChart from "./components/LineChart.jsx";
import DialChart from "./components/DialChart.jsx";
import Card from "./components/Card.jsx"

interface Props {
   name: string
}

class App extends React.Component<Props> {

  render() {

    const reportTime = lhr[lhr.length - 1].git.time;
    const currPerf = lhr[lhr.length-1].categories.performance.score * 100
    const currSeo = lhr[lhr.length-1].categories.seo.score * 100;
    const currBP = lhr[lhr.length-1].categories['best-practices'].score * 100;
    const currAcc = lhr[lhr.length-1].categories.accessibility.score * 100;

    const divStyle = {
      display:'flex'
    }

    return (
      <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="grid-container">

{/* <!-- header --> */}
<header className="header">
    {/* <!-- open collapsed menu on click --> */}
    <div className="menu-icons">
        <span className="material-symbols-outlined">menu</span>
    </div>

    <div className="header-left">
        <span className="material-symbols-outlined">search</span>
    </div>
    <div className="header-right">
        <span className="material-symbols-outlined">notifications</span>
        <span className="material-symbols-outlined">email</span>
        <span className="material-symbols-outlined">account_circle</span>
    </div>
</header>


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
            <span className="material-symbols-outlined">dashboard</span>Dashboard
        </li>
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">bolt</span>Performance
        </li>
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">expand_more</span>Change Endpoint
        </li>
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">help</span> Guide & Demo
        </li>
        <li className="sidebar-list-item">
            <span className="material-symbols-outlined">rocket_launch</span> astroSpeed Login
        </li>
     </ul>
</aside>

{/* <!-- main --> */}
<main className="main-container">
    <div className="main-title">
        <p className="font-weight-bold">Current Commit Analytics</p>
    </div>

    <div className="main-cards">
       <Card 
       name={'Performance'}
       data={currPerf} 
       />

      <Card 
       name={'SEO'}
       data={currSeo} 
       />

      <Card 
       name={'Best Practices'}
       data={currBP} 
       />

      <Card 
       name={'Accessibility'}
       data={currAcc} 
       />


        {/* <div className="card">
            <div className="card-inner">
                <p className="text-primary">PERFORMANCE SCORE</p>
                <span className="material-symbols-outlined text-blue">bolt</span>
            </div>
            <DialChart name={'Current Performance'} data = {currPerf}/>
            <span className="text-primary font-weight-bold">{currPerf}</span>
        </div> */}
{/* 
        <div className="card">
            <div className="card-inner">
                <p className="text-primary">SEO SCORE</p>
                <span className="material-symbols-outlined text-orange">data_thresholding</span>
                <DialChart name={'Current SEO'} data = {currSeo}/>
            </div>
            <span className="text-primary font-weight-bold">{currSeo}</span>
        </div>

        <div className="card">
            <div className="card-inner">
                <p className="text-primary">BEST PRACTICES SCORE</p>
                <span className="material-symbols-outlined text-blue">heart_plus</span>
            </div>
            <span className="text-primary font-weight-bold">{currBP}</span>
        </div>

        <div className="card">
            <div className="card-inner">
                <p className="text-primary">ACCESSIBILITY SCORE</p>
                <span className="material-symbols-outlined text-blue">settings_accessibility</span>
            </div>
            <span className="text-primary font-weight-bold">{currAcc}</span>
        </div> */}
    {/* <!-- end of 4 cards --> */}
    </div>

    <div className="main-title">
        <p className="font-weight-bold">Trends & Diagostics</p>
    </div>

    <div className="charts">
        <div className="charts-card">
            <p className="chart-title">Metrics Over Commits</p>
            <div id="area-chart">
            <LineChart />
            </div>
        </div>

        <div className="recommendations">
            <p className="chart-title">Recommended Actions</p>
            <div id="bar-chart">
            <ListContainer />
            </div>
        </div>

    </div>

</main>

</div>
        Report generated at: {reportTime} <br />
      
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
