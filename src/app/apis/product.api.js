import axios from "axios";

export const getProduct = async (params) => {
  return await axios.get(`http://localhost:3000/api/products?`, { params });
};

export const getCategories = async () => {
  return await axios.get(`http://localhost:3000/api/categories`);
};

export const getTags = async () => {
  return await axios.get(`http://localhost:3000/api/tags`);
};

