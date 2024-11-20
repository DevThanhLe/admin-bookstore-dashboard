import React from 'react';
import RevenueChart from './components/RevenueChart';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { FaHome } from "react-icons/fa";
import { Breadcrumbs, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { analyzeByYear, analyzePerYear } from '../../services/DashboardService';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Revenue = () => {
  const [revenueDataByYear, setRevenueDataByYear] = React.useState([]);
  const [revenueDataPerYear, setRevenueDataPerYear] = React.useState([]);

  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = React.useState(2020);
  const [endYear, setEndYear] = React.useState(currentYear);
  const [yearToAnalyze, setYearToAnalyze] = React.useState(currentYear);

  const dataByYear = async (year) => {
    let res = await analyzeByYear(year);
    if (res) {
      setRevenueDataByYear(res.data);
    }
  };

  const dataPerYear = async (yearStart, yearEnd) => {
    let res = await analyzePerYear(yearStart, yearEnd);
    if (res) {
      setRevenueDataPerYear(res.data);
    }
  };

  React.useEffect(() => {
    dataByYear(yearToAnalyze);
    dataPerYear(startYear, endYear);
  }, [yearToAnalyze, startYear, endYear]);

  const handleYearToAnalyzeChange = (event) => {
    setYearToAnalyze(event.target.value);
  };

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };

  const generateYearOptions = (startYear) => {
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    // <div className="revenue-container">
      <div className='right-content w-100'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
          <h5 className='mb-0'>Analyze Revenue</h5>
          <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
            <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small'/>}/>
            <StyledBreadcrumb label='Revenue'/>
          </Breadcrumbs>
        </div>

        {/* Thống kê theo năm */}
        <div className='card shadow border-0 w-100 flex-column p-4'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Biểu đồ doanh thu theo năm {yearToAnalyze}</h3>
            <FormControl variant="outlined" style={{ minWidth: '150px' }}>
              <InputLabel shrink>Năm</InputLabel>
              <Select
                value={yearToAnalyze}
                onChange={handleYearToAnalyzeChange}
                label="Năm"
              >
                {generateYearOptions(2020).map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          
          <RevenueChart data={revenueDataByYear} type={2} labelnum={1} />
          
        </div>

        {/* Thống kê theo nhiều năm */}
        <div className='card shadow border-0 w-100 flex-column p-4'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Biểu đồ doanh thu từ năm {startYear} đến {endYear}</h3>
            <div className="d-flex">
              <FormControl variant="outlined" style={{ minWidth: '150px', marginRight: '16px' }}>
                <InputLabel shrink>Năm bắt đầu</InputLabel>
                <Select
                  value={startYear}
                  onChange={handleStartYearChange}
                  label="Năm bắt đầu"
                >
                  {generateYearOptions(2020).map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" style={{ minWidth: '150px' }}>
                <InputLabel shrink>Năm kết thúc</InputLabel>
                <Select
                  value={endYear}
                  onChange={handleEndYearChange}
                  label="Năm kết thúc"
                >
                  {generateYearOptions(startYear).map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          
          <RevenueChart data={revenueDataPerYear} type={1} labelnum={2} yearStart={startYear} yearEnd={endYear} />
          
        </div>
      </div>
    // </div>
  );
};

export default Revenue;
