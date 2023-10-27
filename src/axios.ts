import axios from "axios";

export const instance = axios.create({
  baseURL: "gym-app-back.vercel.app",
});
