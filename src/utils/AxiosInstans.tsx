import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export default instance;
