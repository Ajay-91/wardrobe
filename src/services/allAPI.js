import axiosConfig from "./axiosConfig";
import { baseURL } from "./baseURL";

export const createWar = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/war`, reqBody);
};

export const getWar = async () => {
  return await axiosConfig("get", `${baseURL}/war`, "");
};

export const getOneWar = async (id) => {
  return await axiosConfig("get", `${baseURL}/war${id}`, "");
};

export const deleteWar = async (id) => {
  return await axiosConfig("delete", `${baseURL}/war/${id}`, "");
};

export const updateWar = async (id, reqBody) => {
  return await axiosConfig("patch", `${baseURL}/war/${id}`, reqBody);
};
