
import React from "react";
import ReactApexChart from "react-apexcharts";
// import lhr from '../../lighthouse.json'

class DialChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: this.props.results,
        // chartOptions: {
        //     labels: this.props.name
        // },
        options: {
          chart: {
            width: 380,
            type: 'donut',
          },
          //set scalling of the dial
          plotOptions: {
            pie: {
                expandOnClick: false,
                customScale: 0.9,
                donut: {
                    size: '90%',
                    labels: {
                      show: true,
                      name: {
                        show: false,
                      },
                      value: {
                        show: true,
                        fontSize: '5vh',
                        // fontFamily: 'custom',
                        // fontWeight: 'lighter',
                        color: "#000000"
                      },
                      total: {
                        show: false,
                        showAlways: true,
                        label: 'Total',
                        // fontSize: '1px',
                        // fontFamily: 'Comic Sans',
                        // fontWeight: 'lighter',
                        color: '#000000'
                      }
                    }
                  }
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.5,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.8,
              OpacityTo: 0,
              stop: []
            },
            colors: ["#3700A4", "#ffffff"]
          },
          legend: {
            show: false,
          },
          title: {
            // text: this.props.name,
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 100
              },
              legend: {
                show: false,
              }
            }
          }]
        },
      };
    }

    render() {
        const divStyle = {
            padding: '10px',
            float: 'left',
            height: '20vh',
            minHeight: '100px',
        }
        const tableStyle = {
            textAlign: 'center',
        }

        const parentStyle = {
            position: 'absolute',
        }
        const childStyle = {
            position: 'absolute',
            top: '35%',
            left: '42%'
        }

        console.log('this is donut props passed in fron the App, ', this.props.results)
        return (
            <div style={divStyle}>
                <table style={tableStyle}>
                    <tr>
                        <th>{this.props.name}</th>
                    </tr>
                    <div style={parentStyle}>
                        <tr>
                            <td>
                                <div style={childStyle}>
                                    {this.props.results[0]}%
                                </div>
                                <ReactApexChart
                                    options={this.state.options}
                                    series={this.state.series}
                                    type="donut"
                                    width="50%"
                                />
                                on this commit
                            </td>
                        </tr>
                    </div>
                </table>
            </div>
        );
    }
  }

  export default DialChart;





// import React from "react";
// import ReactApexChart from "react-apexcharts";

// class DialChart extends React.Component {
//     constructor(props) {
//         super(props);
//         //will put in props.name & props.results after it renders
//         this.state = {
//             series: [44, 55, 41, 17, 15],
//             options: {
//                 chart: {
//                     width: 380,
//                     type: 'donut',
//                 },
//                 plotOptions: {
//                     pie: {
//                         startAngle: -90,
//                         endAngle: 270
//                     }
//                 },
//                 dataLabels: {
//                     enabled: false
//                 },
//                 fill: {
//                     type: 'gradient',
//                 },
//                 responsive: [{
//                     breakpoint: 480,
//                     options: {
//                         chart: {
//                             width: 200
//                         },
//                     }
//                 }]
//             },
//         };
//     }

//     render() {
//         const divStyle = {
//             height: '10vh',
//             minHeight: '50px',
//         }
//         return (
//             <div style={divStyle}>
//                 {/* // <div id="chart"> */}
//                 <ReactApexChart
//                     options={this.state.options}
//                     series={this.state.series}
//                     type="donut"
//                     width="10%"
//                 />
//             </div>
//         );
//     }
// }



// export default DialChart;

// const domContainer = document.getElementById('dialsRow');
// ReactDOM.render(React.createElement(DialChart), domContainer);


/////////this works but isnt using props and is huge

// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import lhr from '../../lighthouse.json'

// class DialChart extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
      
//         series: [lhr[lhr.length-1].categories.seo.score, (100 - lhr[lhr.length-1].categories.seo.score)],
//         options: {
//           chart: {
//             width: 380,
//             type: 'donut',
//           },
//           plotOptions: {
//             pie: {
//               startAngle: -90,
//               endAngle: 270
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
//             colors: ["#ffffff", "#3700A4"]
//           },
//           legend: {
//             show: false,
//           },
//           title: {
//             text: 'Current SEO',
//           },
//           responsive: [{
//             breakpoint: 480,
//             options: {
//               chart: {
//                 width: 200
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
//         console.log('this is Donut props passed in fron the App, ', this.props)
//         return (
//             <div id="chart">
//                 <ReactApexChart
//                     options={this.state.options}
//                     series={this.state.series}
//                     type="donut" 
//                     width="30%" 
//                 />
//             </div>
//         );
//     }
//   }

//   export default DialChart;
