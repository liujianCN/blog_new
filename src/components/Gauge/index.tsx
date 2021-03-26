/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/charts';
import { LiquidConfig } from '@ant-design/charts/es/liquid';

const LiquidDemo: React.FC = () => {
  const config: LiquidConfig = {
    // height: 158,
    percent: 0.85,
    statistic: {
      // title: {
      //   formatter: () => '完成率',
      //   style: {
      //     fontSize: '12px'
      //   }
      // },
      content: {
        style: {
          fontSize: '20px',
          fill: 'black',
        },
      },
    },
  };
  return <Liquid {...config} />;
};

export default LiquidDemo;
