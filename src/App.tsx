
import * as React from 'react';
import lhr from '../lighthouse.json';
import ListContainer from "../src/components/ListContainer/ListContainer.jsx" 
import LineChart from "./components/LineChart.jsx";

interface Props {
   name: string
}

class App extends React.Component<Props> {
  render() {
    // const { name } = this.props;
    const {fetchTime} = lhr[lhr.length-1];
    const reportDate = new Date(fetchTime.slice(0, -1));
    return (
      <>
        {/* <h1>
          Hello {name}
<<<<<<< HEAD
        </h1> */}
        Report generated at: {reportDate.toLocaleString()} <br />
        Performance: {lhr[lhr.length-1].categories.performance.score}  <br />
        Search Engine Optimization (SEO): {lhr[lhr.length-1].categories.seo.score}  <br />
        <LineChart />
        <ListContainer />
=======
        </h1>
        Report generated at: {lhr[lhr.length-1].fetchTime} <br />
        Performance: {lhr[lhr.length-1].categories.performance.score}
>>>>>>> 8d25008 (test server.js and app.tsx changes)
      </>
    );
  }
}

export default App;
