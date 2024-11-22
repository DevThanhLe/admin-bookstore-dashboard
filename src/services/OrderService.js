import axios from "./AxiosCustom";

// const token = localStorage.getItem("token");

const fetchAllOrders = (page) => {
  return axios.get(
    `api/Orders/recent?page=${page}&size=10`
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
};

export { fetchAllOrders };

// lấy OrderDetails
const getOrderDetailsById = (id) => {
    return axios.get(`api/Orders/${id}`);
  };
  export { getOrderDetailsById };

// Update Sstatus
const updateStatus = (id,status) => {
  return axios.put(`api/Orders/update-status?id=${id}&status=${status}`);
};
export { updateStatus };

const fetchBestSellers = (amout) => {
  return axios.get(
    `api/Orders/best-sellers?amount=${amout}`
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
};
export { fetchBestSellers };

const searchOrders = (searchPhone, orderMonth, orderYear, statusName, page) => {
  const params = new URLSearchParams();

  if (searchPhone) {
    params.append('phone', searchPhone);
  }
  if (orderMonth) {
    params.append('month', orderMonth);
  }
  if (orderYear) {
    params.append('year', orderYear);
  }
  if (statusName) {
    params.append('status', statusName);
  }
  if (page) {
    params.append('page', page);
  }
  params.append('size', 10);

  return axios.get(`api/Orders/search?${params.toString()}`);
};

export { searchOrders };

const updateOrder = (id,data) => {
  return axios.put(`api/Orders/update-information?id=${id}`, data, {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
      'accept': '*/*',
    }
  });
};
export { updateOrder };