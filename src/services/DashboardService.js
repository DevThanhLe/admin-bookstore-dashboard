import axios from "./AxiosCustom";
//Lấy sản phẩm theo id
const getStatistics = () => {
    return axios.get(`api/Dashboard/statistics`);
  };
  export { getStatistics };

const analyzeByYear = (year) => {
  return axios.get(`api/Dashboard/monthly-revenue/${year}`);
};
export { analyzeByYear };

const analyzePerYear = (yearStart,yearEnd) => {
  return axios.get(`api/Dashboard/revenue/years?startYear=${yearStart}&endYear=${yearEnd}`);
};
export { analyzePerYear };