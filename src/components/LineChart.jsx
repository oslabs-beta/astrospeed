import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "./chartdata";
const lhr = window.results;


class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
      currentEndpoint: ''
    };
  }
  

  componentDidMount() {
    const currentChartData = [];
    for (let i = 0; i < 4; i++) {
      currentChartData.push(Object.assign({}, lineChartData[i], {data: lineChartData[i]['data'][this.props.currentEndpoint]}))
    }
    // console.log(lhr[this.props.currentEndpoint][0])
    const currentEndpoint = this.props.currentEndpoint;
    lineChartOptions.tooltip.x = {
      formatter: function(val) {
        return `Commit #${val}<br />${lhr[currentEndpoint][Number(val) - 1].git.time}<br />${lhr[currentEndpoint][Number(val) - 1].git.msg}`
      }
    }
    this.setState({
      chartData: currentChartData, 
      chartOptions: lineChartOptions,
      currentEndpoint: currentEndpoint
    });
  }

  componentDidUpdate() {
    if (this.state.currentEndpoint != this.props.currentEndpoint) {
      const currentChartData = [];
      for (let i = 0; i < 4; i++) {
        currentChartData.push(Object.assign({}, lineChartData[i], {data: lineChartData[i]['data'][this.props.currentEndpoint]}))
      }
    const currentEndpoint = this.props.currentEndpoint;
    lineChartOptions.tooltip.x = {
      formatter: function(val) {
        return `Commit #${val}<br />${lhr[currentEndpoint][Number(val) - 1].git.time}<br />${lhr[currentEndpoint][Number(val) - 1].git.msg}`
      }
    }
    this.setState({
      chartData: currentChartData, 
      chartOptions: lineChartOptions,
      currentEndpoint: currentEndpoint
    });
    }

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
