import React from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js'

const LineChartCurrency = ({
  data
}) => {
  return (
    <LineChart data={data} />
  );
}

export default LineChartCurrency;
