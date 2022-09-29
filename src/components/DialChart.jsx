import React from "react";
import ReactApexChart from "react-apexcharts";


class DialChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [props.data],
            options: {
                //Removed Title because I like to use the Label better for single data series
                // title : {
                //     text: props.name,
                //     align: 'center'
                // }, 
                // title: this.props.name,
                chart: {
                    type: 'radialBar',
                    height: '100px',
                    width: '100px'
                    // offsetY: -20,
                    // sparkline: {
                    //     enabled: true
                    // }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        track: {
                            background: "#e7e7e7",
                            // strokeWidth: '97%', this is not an option in radialBar
                            // margin: 5, // margin is in pixels removed because only 1 track
                            dropShadow: {
                                enabled: true,
                                top: 2,
                                left: 0,
                                // color: '#999', no color option here
                                opacity: 1,
                                blur: 2
                            }
                        },
                        dataLabels: {
                            name: {
                                show: true
                            },
                            value: {
                                offsetY: -50,
                                fontSize: '22px',
                                formatter: (val) => val
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
                        stops: [0, 50, 53, 91] // what is up with these stops
                    },
                },
                labels: [props.name],
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

