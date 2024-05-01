import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface IDonutProps {
  // Define props here if needed
}

interface IDonutState {
  options: {};
  series: number[];
  labels: string[];
}

class Donut extends Component<IDonutProps, IDonutState> {
  constructor(props: any) {
    super(props);

    this.state = {
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E'],
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default Donut;
