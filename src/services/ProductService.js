import axios from "./AxiosCustom";

// Lấy toàn bộ sản phẩm
const fetchAllProducts = (page) => {
  return axios.get(
    `api/products?page=${page}&size=6&sort=ASC`
  );
};
export { fetchAllProducts };

const token = localStorage.getItem("token");

//Lấy sản phẩm bán chạy
const fetchBestSeller = () => {
  return axios.get(`api/products/best-seller?amount=6`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export { fetchBestSeller };

//Tạo sản phẩm
const createProduct = (product) => {
  return axios.post(`api/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export { createProduct };

//Lấy sản phẩm theo id
const getProductById = (id) => {
  return axios.get(`api/products/${id}`);
};
export { getProductById };

//Chỉnh sửa thông tin sản phẩm
const updateProduct = (id, product) => {
  return axios.put(`api/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export { updateProduct };

//Xóa sản phẩm
const deleteProduct = (id) => {
  return axios.delete(`api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export { deleteProduct };