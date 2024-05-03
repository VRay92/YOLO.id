import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface IBarChartProps {

}

interface IBarChartState {
  options: any;
  series: any[];
}

class BarChart extends Component<IBarChartProps, IBarChartState> {
  constructor(props: IBarChartProps) {
    super(props);
    this.state = {
      options: {
        chart: {
          foreColor: '#333',
        },
        xaxis: {
          categories: [
            'New York',
            'Los Angeles',
            'Chicago',
            'Houston',
            'Philadelphia',
            'Phoenix',
            'San Antonio',
            'San Diego',
            'Dallas',
            'San Jose',
          ],
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
          colors: ['#f44336'],
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Largest US Cities By Population',
          align: 'center',
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: '25px',
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#f3f4f6', // text-gray-100
            },
          },
        },
      },
      series: [
        {
          name: 'Population',
          data: [
            8550405, 3971883, 2720546, 2296224, 1567442, 1563025, 1469845,
            1394928, 1300092, 1026908,
          ],
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height="350"
      />
    );
  }
}

export default BarChart;
