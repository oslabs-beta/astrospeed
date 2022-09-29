import React from "react";
import ReactApexChart from "react-apexcharts";


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [76],
            options: {
                chart: {
                    type: 'radialBar',
                    offsetY: -20,
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        track: {
                            background: "#e7e7e7",
                            strokeWidth: '97%',
                            margin: 5, // margin is in pixels
                            dropShadow: {
                                enabled: true,
                                top: 2,
                                left: 0,
                                color: '#999',
                                opacity: 1,
                                blur: 2
                            }
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                offsetY: -2,
                                fontSize: '22px'
                            }
                        }
                    }
                },
                grid: {
                    padding: {
                        top: -10
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        shadeIntensity: 0.4,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 53, 91]
                    },
                },
                labels: ['Average Results'],
            },


        };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" />
            </div>
        );
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ApexChart), domContainer);

// export default DialChart;

//   var chart = new ApexCharts(document.querySelector("#app"), options);
  
//   chart.render();



/////////////////////the below works but is a donut graph that is causing overlap issues with the report

// import React from "react";
// import ReactApexChart from "react-apexcharts";
// // import lhr from '../../lighthouse.json'

// class DialChart extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
      
//         series: this.props.results,
//         // chartOptions: {
//         //     labels: this.props.name
//         // },
//         options: {
//           chart: {
//             width: 380,
//             type: 'donut',
//           },
//           //set scalling of the dial
//           plotOptions: {
//             pie: {
//                 expandOnClick: false,
//                 customScale: 0.9,
//                 donut: {
//                     size: '90%',
//                     labels: {
//                       show: true,
//                       name: {
//                         show: false,
//                       },
//                       value: {
//                         show: true,
//                         fontSize: '5vh',
//                         // fontFamily: 'custom',
//                         // fontWeight: 'lighter',
//                         color: "#000000"
//                       },
//                       total: {
//                         show: false,
//                         showAlways: true,
//                         label: 'Total',
//                         // fontSize: '1px',
//                         // fontFamily: 'Comic Sans',
//                         // fontWeight: 'lighter',
//                         color: '#000000'
//                       }
//                     }
//                   }
//             }
//           },
//           dataLabels: {
//             enabled: false
//           },
//           fill: {
//             type: 'gradient',
//             gradient: {
//               shade: 'light',
//               shadeIntensity: 0.5,
//               gradientToColors: undefined,
//               inverseColors: true,
//               opacityFrom: 0.8,
//               OpacityTo: 0,
//               stop: []
//             },
//             colors: ["#3700A4", "#ffffff"]
//           },
//           legend: {
//             show: false,
//           },
//           title: {
//             // text: this.props.name,
//           },
//           responsive: [{
//             breakpoint: 480,
//             options: {
//               chart: {
//                 width: 100
//               },
//               legend: {
//                 show: false,
//               }
//             }
//           }]
//         },
//       };
//     }

//     render() {
//         const divStyle = {
//             padding: '10px',
//             float: 'left',
//             height: '20vh',
//             minHeight: '100px',
//         }
//         const tableStyle = {
//             textAlign: 'center',
//         }

//         const parentStyle = {
//             position: 'absolute',
//         }
//         const childStyle = {
//             position: 'absolute',
//             top: '35%',
//             left: '42%'
//         }

//         console.log('this is donut props passed in fron the App, ', this.props.results)
//         return (
//             <div style={divStyle}>
//                 <table style={tableStyle}>
//                     <tr>
//                         <th>{this.props.name}</th>
//                     </tr>
//                     <div style={parentStyle}>
//                         <tr>
//                             <td>
//                                 <div style={childStyle}>
//                                     {this.props.results[0]}%
//                                 </div>
//                                 <ReactApexChart
//                                     options={this.state.options}
//                                     series={this.state.series}
//                                     type="donut"
//                                     width="50%"
//                                 />
//                                 on this commit
//                             </td>
//                         </tr>
//                     </div>
//                 </table>
//             </div>
//         );
//     }
//   }

//   export default DialChart;


