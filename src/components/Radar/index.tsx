/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Radar } from '@ant-design/charts';
import { RadarConfig } from '@ant-design/charts/es/radar';

const DemoRadar: React.FC = () => {
  const data = [
    { name: 'G2', star: 10178 },
    { name: 'G6', star: 7077 },
    { name: 'F2', star: 7345 },
    { name: 'L7', star: 2029 },
    { name: 'X6', star: 298 },
    { name: 'AVA', star: 806 },
  ];
  const config: RadarConfig = {
    data: data.map((d) => ({ ...d, star: Math.log(d.star).toFixed(2) })),
    xField: 'name',
    yField: 'star',
    meta: {
      star: {
        alias: '数量',
        min: 0,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {},
    area: {},
  };
  return <Radar {...config} />;
};

export default DemoRadar;
