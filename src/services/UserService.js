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
  return axios.put(`api/User/delete?id=${id}`);
};
export { unActiveUser };