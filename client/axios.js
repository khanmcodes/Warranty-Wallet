import axios from "axios";

const token = localStorage.getItem("token");
const API = axios.create({
  baseURL: "https://warranty-wallet.onrender.com/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default API;
