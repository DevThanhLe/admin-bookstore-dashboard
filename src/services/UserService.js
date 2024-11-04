import axios from "./AxiosCustom";

// const token = localStorage.getItem("token");

const fetchAllUsers = (page) => {
  return axios.get(
    `api/User?pageNumber=${page}&pageSize=10`
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
};

export { fetchAllUsers };