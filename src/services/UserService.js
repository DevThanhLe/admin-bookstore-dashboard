import axios from "./AxiosCustom";

// const token = localStorage.getItem("token");

const fetchAllUsers = (page) => {
  return axios.get(
    `api/User/all-user?pageNumber=${page}&pageSize=10`
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
};

export { fetchAllUsers };

const searchUsers = (input,phone,page) => {
  return axios.get(
    `api/User/filter-user?Email=${input}&Phone=${phone}&pageNumber=${page}&pageSize=10`
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
};

export { searchUsers };

const unActiveUser = (id) => {
  return axios.put(`api/User/hidden?id=${id}`);
};
export { unActiveUser };

const activeUser = (id) => {
  return axios.put(`api/User/visible?id=${id}`);
};
export { activeUser };


const updateUser = (id,data) => {
  return axios.put(`api/User?id=${id}`, data, {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
      'accept': '*/*',
    }
  });
};
export { updateUser };