import axios from "axios";

const instance = axios.create({
  baseURL: "https://application-gym.onrender.com",
});

export default instance;
