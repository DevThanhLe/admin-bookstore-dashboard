import axios from "./AxiosCustom";

const fetchAllBrands = () => {
  return axios.get("api/Brand");
};

export { fetchAllBrands };

// const token = localStorage.getItem("token");
// const updateBrand = (id, name) => {
//   return axios.put(
//     `api/brands/${id}`,
//     { name },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };
// export { updateBrand };

// const deleteBrand = (id) => {
//   return axios.delete(`api/brands/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// export { deleteBrand };

// const addBrand = (name) => {
//   return axios.post(
//     `api/brands`,
//     { name },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };
// export { addBrand };