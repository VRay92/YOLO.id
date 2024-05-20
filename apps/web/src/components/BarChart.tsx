import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface IBarChartProps {
  data: {
    date: string;
    count: number;
  }[];
}

const BarChart: React.FC<IBarChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count));
  const tickAmount = Math.ceil(maxCount) * 1;
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
      categories: data.map((item) => item.date),
      labels: {
        style: {
          colors: '#f3f4f6',
        },
      },
    },
    yaxis: {
      tickAmount: tickAmount,
      labels: {
        style: {
          colors: '#f3f4f6',
        },
        formatter: function (val) {
          return val.toFixed(0);
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
          return val + ' customers';
        },
      },
    },
    colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e'],
  };

  if (data.length === 0) {
    return <div className="text-center py-32 font-semibold">No data available</div>;
  }

  const series = [
    {
      name: 'Customers',
      data: data.map((item) => item.count),
    },
  ];

  return <Chart options={options} series={series} type="bar" height={320} />;
};

export default BarChart;