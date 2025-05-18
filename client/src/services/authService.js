import axios from "../../axios";

export const signup = async (name, email, password) => {
  return axios.post("/auth/signup", { name, email, password });
};

export const login = async (email, password) => {
  return axios.post("/auth/login", { email, password });
};

export const getUser = async () => {
  return axios.get("/auth/me");
};

export const logout = async () => {
  return axios.post("/auth/logout");
};
