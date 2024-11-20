import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ data, type, labelnum, yearStart = new Date().getFullYear(), yearEnd = new Date().getFullYear() }) => {
  const generateLabels = () => {
    if (labelnum === 1) {
      return [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
      ];
    } else if (labelnum === 2) {
      let years = [];
      for (let year = yearStart; year <= yearEnd; year++) {
        years.push(year.toString());
      }
      return years;
    }
    return [];
  };

  const chartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: 'Doanh thu',
        data: data,
        backgroundColor: type === 2 ? 'rgba(75, 192, 192, 1)' : 'red',
        borderColor: type === 2 ? 'rgba(75, 192, 192, 1)' : 'red',
        borderWidth: 1,
        fill: type === 2 ? false : true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Thống kê doanh thu',
      },
    },
  };

  // Kiểm tra nếu tất cả các phần tử trong `data` đều bằng 0
  const isAllZero = data.every(value => value === 0);

  if (isAllZero) {
    return <div>Không có dữ liệu người dùng đặt hàng để thống kê và vẽ biểu đồ !</div>;
  }

  return type === 1 ? (
    <Line data={chartData} options={options} />
  ) : (
    <Bar data={chartData} options={options} />
  );
};

export default RevenueChart;
