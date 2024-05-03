import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface IAreaChartProps {

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
          labels: {
            style: {
              colors: '#f3f4f6', // text-gray-100
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#f3f4f6', // text-gray-100
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
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
        height="350"
      />
    );
  }
}

export default AreaChart;
