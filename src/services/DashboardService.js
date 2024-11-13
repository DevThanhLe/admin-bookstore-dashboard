import axios from "./AxiosCustom";
//Lấy sản phẩm theo id
const getStatistics = () => {
    return axios.get(`api/Dashboard/statistics`);
  };
  export { getStatistics };