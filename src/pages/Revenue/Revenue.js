import React from 'react';
import RevenueChart from './components/RevenueChart';

const Revenue = () => {
  // Dữ liệu doanh thu theo từng tháng trong năm
  const revenueData = [1200, 1500, 800, 1700, 2100, 2500, 2200, 1900, 2300, 2700, 2900, 3200];

  return (
    <div className="revenue-container">
      <div className='right-content w-100'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
          <div className="chart-container w-100">
            <h1>Biểu đồ doanh thu</h1>
            <RevenueChart data={revenueData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
