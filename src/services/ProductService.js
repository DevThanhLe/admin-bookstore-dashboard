import axios from "./AxiosCustom";

// const token = localStorage.getItem("token");
// console.log(token);

// Lấy toàn bộ sản phẩm
const fetchAllProducts = (page,token) => {
//   return axios.get(
//     `api/Book?pageNumber=${page}&pageSize=10`
//   );
// };
  return axios.get(`api/Book?pageNumber=${page}&pageSize=15`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export { fetchAllProducts };

// Search sản phẩm
const searchProducts = (brandId,inputName,page) => {

    const idParams = brandId.map(id => `id=${id}`).join('&');

    return axios.get(
      `api/Book/search-all?${idParams}&name=${inputName}&pageNumber=${page}&pageSize=15`
    );
};
export { searchProducts };

// //Lấy sản phẩm bán chạy
// const fetchBestSeller = () => {
//   return axios.get(`api/products/best-seller?amount=6`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// export { fetchBestSeller };  

//Tạo sản phẩm
const createProduct = (product) => {
  return axios.post(`api/Book/create`, product, {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export { createProduct };

//Lấy sản phẩm theo id
const getProductById = (id) => {
  return axios.get(`api/Book/${id}`);
};
export { getProductById };

// Search Sản phẩm
// const searchAllProduct = (brandId,nameInput) => {
//   return axios.get
// }

// //Chỉnh sửa thông tin sản phẩm
// const updateProduct = (id, product) => {
//   return axios.put(`api/products/${id}`, product, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };
// export { updateProduct };

// //Xóa sản phẩm
// const deleteProduct = (id) => {
//   return axios.delete(`api/products/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// export { deleteProduct };

const productsData = [
  {
    id: 1,
    name: 'Sống để kể lại những anh hùng',
    price: 200.00,
    originalPrice: 57400,
    reviews: 300,
    rating: 3.4,
    // quantity: 10,
    quantity: 6,
    image: 'https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/976/976c937c348f90e844b73da08209084f/f60b2f81dc59ac9e6083682c964d94f8'
  },
  {
    id: 2,
    name: 'Báo chí truyền thóng - Những góc tiếp cận',
    price: 200.00,
    originalPrice: 42000,
    reviews: 219,
    rating: 2.2,
    // quantity: 10,
    quantity: 2,
    image: 'https://book365-bd0597d52b2112b2088efaaa03918d68.s3.ap-southeast-1.amazonaws.com/disk/45b/45b6b0f4788e029611ce97ea6f2e2eae/1003263114617edaa6d7617f1f23ac93'
  },
  {
    id: 3,
    name: 'Chia sẻ từ trái tim',
    price: 200.00,
    originalPrice: 122640,
    reviews: 46,
    rating: 4.9,
    // quantity: 10,
    quantity: 5,
    image: 'https://cdn0.fahasa.com/media/catalog/product/c/h/chiasetutraitim-bia_1.jpg?_gl=1*gwbaoo*_gcl_aw*R0NMLjE3MjU3OTA4NTQuQ2owS0NRandsdlcyQmhEeUFSSXNBRG5JZS1JN0FnZDFOMHZhZkpEWlhLeUhsRnd2aXdEd0R0T0ZReWZvOWFIbHozZmsyOHB6UTVmT3F3WWFBaWxjRUFMd193Y0I.*_gcl_au*MTcwNTIzOTU3Ny4xNzI1NzkwODQ4*_ga*MTYwMDc1MzIzOS4xNzI1NzkwODQ4*_ga_460L9JMC2G*MTcyNzAxNjE3OC4yLjEuMTcyNzAxNjE5OC40MC4wLjI4NTExOTIyMw..'
  },
  {
    id: 4,
    name: 'Thám tử lừng danh Conan - tập 103',
    price: 200.00,
    originalPrice: 23500,
    reviews: 26,
    rating: 4.2,
    // quantity: 10,
    quantity: 1,
    image: 'https://cdn0.fahasa.com/media/catalog/product/t/h/tham_tu_lung_danh_conan_bia_tap_103.jpg?_gl=1*1dy8o2w*_gcl_aw*R0NMLjE3MjU3OTA4NTQuQ2owS0NRandsdlcyQmhEeUFSSXNBRG5JZS1JN0FnZDFOMHZhZkpEWlhLeUhsRnd2aXdEd0R0T0ZReWZvOWFIbHozZmsyOHB6UTVmT3F3WWFBaWxjRUFMd193Y0I.*_gcl_au*MTcwNTIzOTU3Ny4xNzI1NzkwODQ4*_ga*MTYwMDc1MzIzOS4xNzI1NzkwODQ4*_ga_460L9JMC2G*MTcyNzAxNjE3OC4yLjEuMTcyNzAxNjUyMy4zMC4wLjI4NTExOTIyMw..'
  },
  {
    id: 5,
    name: 'Mèo con phiêu lưu ký',
    price: 200.00,
    originalPrice: 63300,
    reviews: 377,
    rating: 3.5,
    quantity: 10,
    // quantity: 8,
    image: 'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/meo_con_phieu_luu_ky/2022_10_13_15_01_01_1-390x510.jpg'
  },
  {
    id: 6,
    name: 'Để sang năm trẻ lại',
    price: 200.00,
    originalPrice: 100100,
    reviews: 152,
    rating: 3.6,
    quantity: 10,
    image: 'https://cdn0.fahasa.com/media/catalog/product/d/e/de_sang_nam_tre_lai.jpg'
  }
];

export { productsData };