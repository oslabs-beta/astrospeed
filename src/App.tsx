
import * as React from 'react';
import lhr from '../lighthouse.json'
import Chart from './Chart.jsx'

interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
        Report generated at: {lhr[lhr.length-1].fetchTime} <br />
        Performance: {lhr[lhr.length-1].categories.performance.score}
        <Chart />
      </>
    );
  }
}

export default App;
