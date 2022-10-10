import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "./chartdata";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }
  

  componentDidMount() {
    const currentChartData = [];
    for (let i = 0; i < 4; i++) {
      currentChartData.push(Object.assign({}, lineChartData[i], {data: lineChartData[i]['data'][this.props.currentEndpoint]}))
    }
    this.setState({
      chartData: currentChartData, 
      chartOptions: lineChartOptions,
    });
  }

  render() {
    const divStyle = {
      height: '50vh',
      minHeight: '400px',
    }
    // console.log(this.state.chartData[this.props.currentEndpoint])
    return (
      <div style={divStyle}>
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="area"
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

export default LineChart;
