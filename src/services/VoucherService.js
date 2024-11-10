import axios from "./AxiosCustom";

const createVoucher = (voucherData) => {
  return axios.post('api/Voucher', voucherData, {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
      'accept': '*/*',
    }
  });
};

export { createVoucher };

// Lấy toàn bộ Voucher
// const fetchAllVouchers = (page,token) => {
const fetchAllVouchers = () => {
    return axios.get(
    `api/Voucher/amdin`
    );
};
//   return axios.get(`api/Book?pageNumber=${page}&pageSize=15`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
export { fetchAllVouchers };