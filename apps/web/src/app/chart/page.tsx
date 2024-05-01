'use client';
import * as React from 'react';
import ApexCharts from 'apexcharts';
import BarChart from '@/components/BarChart';
import AreaChart from '@/components/AreaChart';
import Donut from '@/components/Donut';

interface ICobaProps {}

const Coba: React.FunctionComponent<ICobaProps> = (props) => {
  return (
    <div>
      <BarChart />
      <AreaChart />
      <Donut />
    </div>
  );
};

export default Coba;
