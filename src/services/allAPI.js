import axiosConfig from "./axiosConfig";

export const createWar = async (reqBody) => {
  return await axiosConfig("post", "http://localhost:3000/war", reqBody);
};

export const getWar = async () => {
  return await axiosConfig("get", "http://localhost:3000/war", "");
};

export const getOneWar = async (id) => {
  return await axiosConfig("get", `http://localhost:3000/war/${id}`, "");
};

export const deleteWar = async (id) => {
  return await axiosConfig("delete", `http://localhost:3000/war/${id}`, "");
};

export const updateWar = async (id, reqBody) => {
  return await axiosConfig("patch", `http://localhost:3000/war/${id}`, reqBody);
};
