
import * as React from 'react';
// import lhr from '../lighthouse.json';
const lhr = (window as any).results;
// import git_commits from '../git_commits.json';
// const git_commits = (window as any).results
import ListContainer from "../src/components/ListContainer/ListContainer.jsx" 
import LineChart from "./components/LineChart.jsx";
import DialChart from "./components/DialChart.jsx";


interface Props {
   name: string
}
// interface Window {
//   results: any;
// }


// function getData () => {
  
// }

class App extends React.Component<Props> {
  // axios.get();
  render() {
    // axios.get('./data.json').then(resp => console.log(resp))
    // const { name } = this.props;
    // const {fetchTime} = lhr[lhr.length-1];
    // const reportDate = new Date(fetchTime.slice(0, -1));
    const reportTime = lhr[lhr.length - 1].git.time;
    const currPerf = lhr[lhr.length-1].categories.performance.score * 100
    const gapPerf = 100 - currPerf
    const currSeo = lhr[lhr.length-1].categories.seo.score * 100;
    const gapSeo = 100 - currSeo;

    const divStyle = {
      display:'flex'
    }

    return (
      <>
        Report generated at: {reportTime} <br />

        <div style={divStyle}>
            <DialChart name={'Current Performance'} data = {currPerf}/>
            <DialChart name={'Current SEO'} data = {currSeo}/>
        </div>
        <LineChart />

        RECOMMENDED ACTIONS
        <ListContainer />
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
