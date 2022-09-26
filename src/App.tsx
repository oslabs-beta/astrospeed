
import * as React from 'react';
import lhr from '../lighthouse.json'

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
        Report generated at: {lhr.fetchTime} <br />
        Performance: {lhr.categories.performance.score}
      </>
    );
  }
}

export default App;
