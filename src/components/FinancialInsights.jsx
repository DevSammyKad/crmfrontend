import React from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexCharts from 'react-apexcharts';
import { TotalRevenueOptions, TotalRevenueSeries } from '../Data/Chart';

const FinancialInsights = () => {
  return (
    <div>
      <h1 className="font-bold font-lg">Income And Expense Analytics</h1>
      <ReactApexCharts
        options={TotalRevenueOptions}
        series={TotalRevenueSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default FinancialInsights;
