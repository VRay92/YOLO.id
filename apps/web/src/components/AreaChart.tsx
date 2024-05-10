import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface IAreaChartProps {
  data: any;
}

const AreaChart: React.FC<IAreaChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
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
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#FF4560'],
    tooltip: {
      theme: 'dark',
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: 'Revenue',
      data: data.map((item: any) => item.revenue),
    },
  ];

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default AreaChart;