import axios from "axios";

export const instance = axios.create({
  baseURL: "https://application-gym.onrender.com/api",
});

// process.env.REACT_APP_API_URL
