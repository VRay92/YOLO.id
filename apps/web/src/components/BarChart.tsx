import React, { Component } from 'react';
import Chart from 'react-apexcharts';

// Define the interface for component props
interface IBarChartProps {
  // Define props here if needed
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
          background: '#f4f4f4', // Corrected the typo
          foreColor: '#333',
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
        },
        plotOptions: {
          bar: { horizontal: false },
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
        height="450"
        width="100%"
      />
    );
  }
}

export default BarChart;
