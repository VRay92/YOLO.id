import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface IBarChartProps {
  data: any;
}

const BarChart: React.FC<IBarChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      type: 'datetime',
      categories: data.map((item: any) => item.date),
      labels: {
        style: {
          colors: '#f3f4f6',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#f3f4f6',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val: any) {
          return val + ' visitors';
        },
      },
    },
    colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e'],
  };

  const series = [
    {
      name: 'Visitors',
      data: data.map((item: any) => item.visitors),
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChart;