import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface IDonutProps {
  data: { label: string; value: number }[];
}

const Donut: React.FC<IDonutProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
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
    labels: data.map((item) => item.label),
    colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e'],
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: '#f3f4f6',
      },
    },
    tooltip: {
      theme: 'dark',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  if (data.length === 0) {
    return <div className='text-center py-20 font-semibold'>No data available</div>;
  }
  const series = data.map((item) => item.value);

  return <Chart options={options} series={series} type="donut" width="100%" height={350} />;
};

export default Donut;
