import axios from "./AxiosCustom";

const LoginApi = (username, password) => {
    return axios.post("api/Auth/login", { 
        username, 
        password 
    });
};
export { LoginApi };