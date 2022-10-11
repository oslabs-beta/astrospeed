import React from "react";
import ReactApexChart from "react-apexcharts";


class DialChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [props.data],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        name: {
                          fontSize: '6px',
                          color: '#000000',
                          offsetY: 120
                        },
                        value: {
                          offsetY: -10,
                          fontSize: '15px',
                          color: undefined,
                          formatter: function (val) {
                            return val + "%";
                          }
                        }
                      }
                    }
                  },
                  fill: {
                    colors: ['#3700A4', '#000000'],
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                    },
                  },
                  stroke: {
                    dashArray: 4
                  },
                  labels: [' '],
                //   labels: [`${props.name}`],
                },
              
              
              };
            }
    
    render() {
        const divStyle = {
            width: '50%',
        }
        return (
            <div style={divStyle}>
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" />
            </div>
        );
    }
}

export default DialChart; 

