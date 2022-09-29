
import * as React from 'react';
import lhr from '../lighthouse.json';
import ListContainer from "../src/components/ListContainer/ListContainer.jsx" 
import LineChart from "./components/LineChart.jsx";
// import DialChart from "./components/DialChart.jsx";


interface Props {
   name: string
}

class App extends React.Component<Props> {
  render() {
    // const { name } = this.props;
    const {fetchTime} = lhr[lhr.length-1];
    const reportDate = new Date(fetchTime.slice(0, -1));
    const currPerf = lhr[lhr.length-1].categories.performance.score * 100
    const gapPerf = 100 - currPerf
    const currSeo = lhr[lhr.length-1].categories.seo.score * 100;
    const gapSeo = 100 - currSeo;

    return (
      <>
        {/* <h1>
          Hello {name}
        </h1> */}
        Report generated at: {reportDate.toLocaleString()} <br />
        {/* Performance: {lhr[lhr.length-1].categories.performance.score}  <br />
        Search Engine Optimization (SEO): {lhr[lhr.length-1].categories.seo.score}  <br /> */}
        {/* Put this centre of dial and legend -- Performance: {`${currPerf}%`}  <br />
        Put this centre of dial  and legend -- Search Engine Optimization (SEO): {`${currSeo}%`}  <br /> */}

        {/* put the dials side by side */}
        {/* <div className='dialsRow'> */}
        
        <div id="chart">
          {/* <DialChart 
            name={'Current Performance'}
            results={[currPerf, gapPerf]}
          />
          <DialChart 
          name={'Current SEO'}
          results={[currSeo, gapSeo]}
          /> */}
        </div>

        <LineChart />

        RECOMMENDED ACTIONS
        <ListContainer />
      </>
    );
  }
}

export default App;
