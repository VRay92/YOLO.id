import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface IDonutProps {

}

interface IDonutState {
  options: {
    labels: string[];
    legend: {
      labels: {
        colors: string;
      };
    };
  };
  series: number[];
}

class Donut extends Component<IDonutProps, IDonutState> {
  constructor(props: IDonutProps) {
    super(props);
    this.state = {
      options: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        legend: {
          labels: {
            colors: '#f3f4f6', // text-gray-100
          },
        },
      },
      series: [44, 55, 41, 17, 15],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="donut"
        width="100%"
        height="350"
      />
    );
  }
}

export default Donut;
