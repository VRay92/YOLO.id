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
      type: 'line',
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
          colors: '#000000',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#000000',
        },
        formatter: (value) => {
          return `${new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(value).replace('IDR', '').trim()}`;
        },
      },
    },
    fill: {
      type: 'solid',
      opacity: 0,
      // gradient: {
      //   shade: 'dark',
      //   gradientToColors: ['#FDD835'],
      //   shadeIntensity: 1,
      //   type: 'horizontal',
      //   opacityFrom: 1,
      //   opacityTo: 1,
      //   stops: [0, 100, 100, 100],
      // },
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

  if (data.length === 0) {
    return <div className='text-center py-32 font-semibold'>No data available</div>;
  }

  const series = [
    {
      name: 'Revenue',
      data: data.map((item: any) => item.revenue),
    },
  ];

  return <Chart options={options} series={series} type="area" height={320} />;
};

export default AreaChart;