import axios from "axios";

const API = axios.create({
  baseURL: "https://warranty-wallet.onrender.com/api",
  withCredentials: true,
  credentials: 'include'
});

export default API;
