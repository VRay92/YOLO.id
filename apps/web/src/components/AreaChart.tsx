import React, { Component } from 'react';
import Chart from 'react-apexcharts';

// Define the interface for component props
interface IAreaChartProps {
  // Define props here if needed
}

interface IAreaChartState {
  options: any;
  series: { name: string; data: number[] }[];
}

class AreaChart extends Component<IAreaChartProps, IAreaChartState> {
  constructor(props: IAreaChartProps) {
    super(props);
    this.state = {
      options: {
        chart: {
          height: 280,
          type: 'area',
        },
        xaxis: {
          categories: [
            '01 Jan',
            '02 Jan',
            '03 Jan',
            '04 Jan',
            '05 Jan',
            '06 Jan',
            '07 Jan',
          ],
        },
        plotOptions: {
          bar: { horizontal: false },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
      },
      series: [
        {
          name: 'Series 1',
          data: [45, 52, 38, 100, 80, 23, 40],
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="area"
        height="450"
        width="100%"
      />
    );
  }
}

export default AreaChart;
